/* ==============================================
   STUBUU - Supabase Sync Module
   Handles authentication and cloud data persistence
============================================== */

const SUPABASE_URL = 'https://ixicjppmvzoqccwvixym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aWNqcHBtdnpvcWNjd3ZpeHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDQwODMsImV4cCI6MjA4OTgyMDA4M30.pk2ZBMV4V2QAKUVbQ-pW6WM-xMIn9gzeC5wIS8sm8Tw';

let supabaseClient = null;
let _saveTimeout = null;

/* --- INITIALIZATION --- */
function initSupabase() {
    if (typeof supabase !== 'undefined' && supabase.createClient) {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('[Supabase] Client initialized');
    } else {
        console.error('[Supabase] SDK not loaded');
    }
}

/* --- AUTH FUNCTIONS --- */
async function supabaseSignUp(email, password) {
    if (!supabaseClient) return { data: null, error: { message: 'Supabase not initialized' } };

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (!error && data.user) {
        // Create initial user_data row
        await supabaseClient.from('user_data').upsert({
            user_id: data.user.id,
            settings: {},
            tasks: [],
            schedule: {},
            resources: [],
            progress: {},
            reflections: []
        }, { onConflict: 'user_id' });
    }

    return { data, error };
}

async function supabaseSignIn(email, password) {
    if (!supabaseClient) return { data: null, error: { message: 'Supabase not initialized' } };

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    return { data, error };
}

async function supabaseSignOut() {
    if (!supabaseClient) return { error: { message: 'Supabase not initialized' } };

    const { error } = await supabaseClient.auth.signOut();
    return { error };
}

async function getSupabaseUser() {
    if (!supabaseClient) return null;

    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

async function getSupabaseSession() {
    if (!supabaseClient) return null;

    const { data: { session } } = await supabaseClient.auth.getSession();
    return session;
}

/* --- DATA SYNC FUNCTIONS --- */

/**
 * Load all user data from Supabase.
 * Returns an object with settings, tasks, schedule, resources, progress, reflections
 * or null if no data found / not authenticated.
 */
async function loadFromSupabase() {
    if (!supabaseClient) return null;

    const user = await getSupabaseUser();
    if (!user) return null;

    try {
        const { data, error } = await supabaseClient
            .from('user_data')
            .select('settings, tasks, schedule, resources, progress, reflections')
            .eq('user_id', user.id)
            .single();

        if (error) {
            // If no row exists yet, that's OK — return null
            if (error.code === 'PGRST116') {
                console.log('[Supabase] No data row yet for this user');
                return null;
            }
            console.error('[Supabase] Load error:', error.message);
            return null;
        }

        console.log('[Supabase] Data loaded successfully');
        return data;
    } catch (e) {
        console.error('[Supabase] Load exception:', e);
        return null;
    }
}

/**
 * Save all user data to Supabase.
 * @param {Object} allData - { settings, tasks, schedule, resources, progress, reflections }
 */
async function saveToSupabase(allData) {
    if (!supabaseClient) return;

    const user = await getSupabaseUser();
    if (!user) return;

    try {
        const { error } = await supabaseClient
            .from('user_data')
            .upsert({
                user_id: user.id,
                settings: allData.settings || {},
                tasks: allData.tasks || [],
                schedule: allData.schedule || {},
                resources: allData.resources || [],
                progress: allData.progress || {},
                reflections: allData.reflections || [],
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

        if (error) {
            console.error('[Supabase] Save error:', error.message);
        } else {
            console.log('[Supabase] Data saved successfully');
        }
    } catch (e) {
        console.error('[Supabase] Save exception:', e);
    }
}

/**
 * Debounced save — waits 2 seconds after last call before actually saving.
 * This avoids hammering the database on rapid changes.
 */
function debouncedSaveToSupabase(allData) {
    if (_saveTimeout) clearTimeout(_saveTimeout);
    _saveTimeout = setTimeout(() => {
        saveToSupabase(allData);
    }, 2000);
}

/**
 * Helper: call this from any save function in script.js to trigger a cloud sync.
 * Collects all current data and saves to Supabase.
 */
function triggerCloudSync() {
    if (!supabaseClient) return;

    // These globals are defined in script.js
    if (typeof settings === 'undefined') return;

    const allData = {
        settings: settings,
        tasks: tasks,
        schedule: schedule,
        resources: resources,
        progress: progress,
        reflections: reflections
    };

    debouncedSaveToSupabase(allData);
}
