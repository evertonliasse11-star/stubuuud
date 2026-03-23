/* ==============================================
   STUBUU - Study Buddy Application
   Complete JavaScript with Full Functionality
============================================== */

/* --- DATA STORAGE KEYS --- */
const STORAGE_KEYS = {
    USERS: 'stubuu_users',
    CURRENT_USER: 'stubuu_current_user',
    SETTINGS: 'stubuu_settings',
    TASKS: 'stubuu_tasks',
    SCHEDULE: 'stubuu_schedule',
    RESOURCES: 'stubuu_resources',
    PROGRESS: 'stubuu_progress',
    AI_AVATAR: 'stubuu_ai_avatar',
    REFLECTIONS: 'stubuu_reflections'
};

/* --- DEFAULT DATA --- */
const DEFAULT_SETTINGS = {
    userName: 'Student',
    avatarColor: '2563eb',
    avatarType: 'initials', // 'initials', 'preset', or 'custom'
    presetAvatar: null, // FontAwesome icon class (e.g., 'fa-user-astronaut')
    customAvatar: null, // Base64 string of uploaded image
    theme: 'light',
    themeStyle: 'default', // 'default', 'neon', 'nature', 'minimal', 'retro'
    accentColor: 'blue',
    defaultTimerDuration: 25,
    soundEnabled: true,
    timezone: 'auto',
    ollamaUrl: 'http://127.0.0.1:3030', // Proxy server URL — update with your public URL (e.g., ngrok URL) when publishing
    ollamaModel: 'gpt-4o',
    aiProvider: 'ollama', // 'ollama' or 'puter'
    aiCharacter: 'assistant',
    aiConscience: 'moderate',
    language: 'en'
};

const DEFAULT_RESOURCES = [
    { id: 1, name: 'Khan Academy', desc: 'Free online courses, lessons & practice.', url: 'https://www.khanacademy.org', color: 'red', icon: 'fa-graduation-cap' },
    { id: 2, name: 'Coursera', desc: 'Build skills with courses from universities.', url: 'https://www.coursera.org', color: 'green', icon: 'fa-graduation-cap' },
    { id: 3, name: 'IB Past Papers', desc: 'Archive of past examination papers.', url: '#', color: 'blue', icon: 'fa-file-pdf' }
];

const DEFAULT_SCHEDULE = {
    monday: [{ title: 'Math', time: '08:00' }, { title: 'History', time: '10:00' }],
    tuesday: [{ title: 'English', time: '09:00' }],
    wednesday: [{ title: 'Science', time: '11:00' }],
    thursday: [],
    friday: [{ title: 'PE', time: '14:00' }],
    saturday: [],
    sunday: []
};

const DEFAULT_PROGRESS = {
    totalFocusMinutes: 0,
    sessionsCompleted: 0,
    tasksCompleted: 0,
    currentStreak: 0,
    lastActiveDate: null,
    weeklyFocusMinutes: { Math: 0, Science: 0, English: 0, Arts: 0, Other: 0 },
    sessionHistory: [] // Array of { date: ISOString, duration: number, subject: string }
};

/* --- REGIONAL OLLAMA SERVERS --- */
const REGIONAL_OLLAMA_SERVERS = {
    'Americas': { url: 'https://ollama-us.public-api.example.com', label: 'Americas (US East)' },
    'Europe': { url: 'https://ollama-eu.public-api.example.com', label: 'Europe (Frankfurt)' },
    'Asia': { url: 'https://ollama-asia.public-api.example.com', label: 'Asia Pacific (Singapore)' },
    'Africa': { url: 'https://ollama-af.public-api.example.com', label: 'Africa (Johannesburg)' },
    'Oceania': { url: 'https://ollama-oce.public-api.example.com', label: 'Oceania (Sydney)' },
    'default': { url: 'https://ollama-us.public-api.example.com', label: 'Default (US East)' }
};

function getRegionalOllamaUrl() {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const region = tz.split('/')[0];

        const regionMap = {
            'America': 'Americas',
            'US': 'Americas',
            'Canada': 'Americas',
            'Europe': 'Europe',
            'Africa': 'Africa',
            'Asia': 'Asia',
            'Indian': 'Asia',
            'Australia': 'Oceania',
            'Pacific': 'Oceania'
        };

        const mappedRegion = regionMap[region] || 'default';
        return REGIONAL_OLLAMA_SERVERS[mappedRegion] || REGIONAL_OLLAMA_SERVERS['default'];
    } catch (e) {
        return REGIONAL_OLLAMA_SERVERS['default'];
    }
}

/* --- TRANSLATIONS --- */
const TRANSLATIONS = {
    en: { dashboard: 'Dashboard', schedule: 'Schedule', resources: 'Resources', progress: 'Progress', reflections: 'Reflections', settings: 'Settings', welcome: 'Welcome', signOut: 'Sign Out', focusSession: 'Focus Session', quickTasks: 'Quick Tasks', profileSettings: 'Profile Settings', aiSettings: 'AI Settings', appearance: 'Appearance', timerSettings: 'Timer Settings', dataManagement: 'Data Management', languagePreference: 'Language Preference', interfaceLang: 'Interface language: English', exportData: 'Export Data', importData: 'Import Data', clearAll: 'Clear All Data', save: 'Save Profile', testConnection: 'Test Connection', autoDetect: 'Auto-detect' },
    fr: { dashboard: 'Tableau de bord', schedule: 'Emploi du temps', resources: 'Ressources', progress: 'Progrès', reflections: 'Réflexions', settings: 'Paramètres', welcome: 'Bienvenue', signOut: 'Déconnexion', focusSession: 'Session Focus', quickTasks: 'Tâches Rapides', profileSettings: 'Paramètres du Profil', aiSettings: 'Paramètres IA', appearance: 'Apparence', timerSettings: 'Paramètres du Minuteur', dataManagement: 'Gestion des Données', languagePreference: 'Langue', interfaceLang: 'Langue d\'interface : Français', exportData: 'Exporter', importData: 'Importer', clearAll: 'Tout Effacer', save: 'Enregistrer', testConnection: 'Tester', autoDetect: 'Détecter' },
    es: { dashboard: 'Panel', schedule: 'Horario', resources: 'Recursos', progress: 'Progreso', reflections: 'Reflexiones', settings: 'Configuración', welcome: 'Bienvenido', signOut: 'Cerrar Sesión', focusSession: 'Sesión de Enfoque', quickTasks: 'Tareas Rápidas', profileSettings: 'Perfil', aiSettings: 'Config. IA', appearance: 'Apariencia', timerSettings: 'Temporizador', dataManagement: 'Gestión de Datos', languagePreference: 'Idioma', interfaceLang: 'Idioma de interfaz: Español', exportData: 'Exportar', importData: 'Importar', clearAll: 'Borrar Todo', save: 'Guardar', testConnection: 'Probar', autoDetect: 'Auto-detectar' },
    pt: { dashboard: 'Painel', schedule: 'Agenda', resources: 'Recursos', progress: 'Progresso', reflections: 'Reflexões', settings: 'Configurações', welcome: 'Bem-vindo', signOut: 'Sair', focusSession: 'Sessão Foco', quickTasks: 'Tarefas Rápidas', profileSettings: 'Perfil', aiSettings: 'Config. IA', appearance: 'Aparência', timerSettings: 'Temporizador', dataManagement: 'Dados', languagePreference: 'Idioma', interfaceLang: 'Idioma da interface: Português', exportData: 'Exportar', importData: 'Importar', clearAll: 'Limpar Tudo', save: 'Salvar', testConnection: 'Testar', autoDetect: 'Auto-detectar' },
    de: { dashboard: 'Dashboard', schedule: 'Zeitplan', resources: 'Ressourcen', progress: 'Fortschritt', reflections: 'Reflexionen', settings: 'Einstellungen', welcome: 'Willkommen', signOut: 'Abmelden', focusSession: 'Fokus-Sitzung', quickTasks: 'Schnelle Aufgaben', profileSettings: 'Profil', aiSettings: 'KI-Einstellungen', appearance: 'Erscheinung', timerSettings: 'Timer', dataManagement: 'Datenverwaltung', languagePreference: 'Sprache', interfaceLang: 'Oberflächensprache: Deutsch', exportData: 'Exportieren', importData: 'Importieren', clearAll: 'Alles Löschen', save: 'Speichern', testConnection: 'Testen', autoDetect: 'Erkennen' },
    zh: { dashboard: '仪表盘', schedule: '日程', resources: '资源', progress: '进度', reflections: '反思', settings: '设置', welcome: '欢迎', signOut: '退出', focusSession: '专注时段', quickTasks: '快速任务', profileSettings: '个人设置', aiSettings: 'AI 设置', appearance: '外观', timerSettings: '计时器', dataManagement: '数据管理', languagePreference: '语言', interfaceLang: '界面语言：中文', exportData: '导出', importData: '导入', clearAll: '清除所有', save: '保存', testConnection: '测试', autoDetect: '自动检测' },
    ja: { dashboard: 'ダッシュボード', schedule: 'スケジュール', resources: 'リソース', progress: '進捗', reflections: '振り返り', settings: '設定', welcome: 'ようこそ', signOut: 'ログアウト', focusSession: '集中セッション', quickTasks: 'クイックタスク', profileSettings: 'プロフィール', aiSettings: 'AI設定', appearance: '外観', timerSettings: 'タイマー', dataManagement: 'データ管理', languagePreference: '言語', interfaceLang: 'インターフェース言語：日本語', exportData: 'エクスポート', importData: 'インポート', clearAll: '全データ削除', save: '保存', testConnection: 'テスト', autoDetect: '自動検出' },
    ko: { dashboard: '대시보드', schedule: '일정', resources: '자료', progress: '진행', reflections: '성찰', settings: '설정', welcome: '환영합니다', signOut: '로그아웃', focusSession: '집중 세션', quickTasks: '빠른 작업', profileSettings: '프로필', aiSettings: 'AI 설정', appearance: '외관', timerSettings: '타이머', dataManagement: '데이터 관리', languagePreference: '언어', interfaceLang: '인터페이스 언어: 한국어', exportData: '내보내기', importData: '가져오기', clearAll: '모두 삭제', save: '저장', testConnection: '테스트', autoDetect: '자동감지' },
    ar: { dashboard: 'لوحة التحكم', schedule: 'الجدول', resources: 'الموارد', progress: 'التقدم', reflections: 'التأملات', settings: 'الإعدادات', welcome: 'مرحباً', signOut: 'تسجيل الخروج', focusSession: 'جلسة تركيز', quickTasks: 'مهام سريعة', profileSettings: 'الملف الشخصي', aiSettings: 'إعدادات الذكاء', appearance: 'المظهر', timerSettings: 'المؤقت', dataManagement: 'إدارة البيانات', languagePreference: 'اللغة', interfaceLang: 'لغة الواجهة: العربية', exportData: 'تصدير', importData: 'استيراد', clearAll: 'مسح الكل', save: 'حفظ', testConnection: 'اختبار', autoDetect: 'كشف تلقائي' },
    hi: { dashboard: 'डैशबोर्ड', schedule: 'समय-सारणी', resources: 'संसाधन', progress: 'प्रगति', reflections: 'चिंतन', settings: 'सेटिंग्स', welcome: 'स्वागत है', signOut: 'लॉग आउट', focusSession: 'फोकस सत्र', quickTasks: 'त्वरित कार्य', profileSettings: 'प्रोफ़ाइल', aiSettings: 'AI सेटिंग्स', appearance: 'दिखावट', timerSettings: 'टाइमर', dataManagement: 'डेटा प्रबंधन', languagePreference: 'भाषा', interfaceLang: 'इंटरफेस भाषा: हिन्दी', exportData: 'निर्यात', importData: 'आयात', clearAll: 'सब मिटाएं', save: 'सहेजें', testConnection: 'परीक्षण', autoDetect: 'स्वतः पहचान' },
    sw: { dashboard: 'Dashibodi', schedule: 'Ratiba', resources: 'Rasilimali', progress: 'Maendeleo', reflections: 'Tafakuri', settings: 'Mipangilio', welcome: 'Karibu', signOut: 'Ondoka', focusSession: 'Kipindi cha Umakini', quickTasks: 'Kazi za Haraka', profileSettings: 'Wasifu', aiSettings: 'Mipangilio ya AI', appearance: 'Mwonekano', timerSettings: 'Kipima Muda', dataManagement: 'Usimamizi wa Data', languagePreference: 'Lugha', interfaceLang: 'Lugha ya kiolesura: Kiswahili', exportData: 'Hamisha', importData: 'Ingiza', clearAll: 'Futa Yote', save: 'Hifadhi', testConnection: 'Jaribu', autoDetect: 'Tambua-kiotomatiki' }
};

function applyLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

    // Update sidebar nav items
    const navItems = document.querySelectorAll('.nav-item a');
    const navKeys = ['dashboard', 'schedule', 'resources', 'progress', 'reflections', 'settings'];
    navItems.forEach((item, index) => {
        if (navKeys[index] && t[navKeys[index]]) {
            const icon = item.querySelector('i');
            const iconHTML = icon ? icon.outerHTML : '';
            item.innerHTML = iconHTML + ' ' + t[navKeys[index]];
        }
    });

    // Update greeting
    const greetingText = document.getElementById('greeting-text');
    if (greetingText) greetingText.textContent = `${t.welcome}, ${settings.userName}!`;

    // Update sign out button
    const signOutBtn = document.querySelector('.signout-btn');
    if (signOutBtn) {
        const icon = signOutBtn.querySelector('i');
        const iconHTML = icon ? icon.outerHTML : '';
        signOutBtn.innerHTML = iconHTML + ' ' + t.signOut;
    }

    // Update settings card headers
    const settingsHeaders = {
        'Profile Settings': t.profileSettings,
        'AI Settings': t.aiSettings,
        'Appearance': t.appearance,
        'Timer Settings': t.timerSettings,
        'Data Management': t.dataManagement,
        'Language Preference': t.languagePreference
    };

    document.querySelectorAll('.settings-card h3').forEach(h3 => {
        const icon = h3.querySelector('i');
        const iconHTML = icon ? icon.outerHTML : '';
        const text = h3.textContent.trim();
        for (const [enText, translation] of Object.entries(settingsHeaders)) {
            if (text === enText || Object.values(TRANSLATIONS).some(tr => Object.values(tr).includes(text))) {
                // Try to match the original English key
                const matchedKey = Object.entries(settingsHeaders).find(([k]) => text.includes(k.split(' ')[0]) || k === text);
                if (matchedKey) {
                    h3.innerHTML = iconHTML + ' ' + matchedKey[1];
                    break;
                }
            }
        }
    });

    // Update dashboard card headers
    const focusHeader = document.querySelector('.study-card h3');
    if (focusHeader) {
        const icon = focusHeader.querySelector('i');
        focusHeader.innerHTML = (icon ? icon.outerHTML : '') + ' ' + t.focusSession;
    }

    const taskHeader = document.querySelector('.schedule-card h3');
    if (taskHeader) {
        const icon = taskHeader.querySelector('i');
        taskHeader.innerHTML = (icon ? icon.outerHTML : '') + ' ' + t.quickTasks;
    }

    // Update language preview
    const langPreview = document.getElementById('language-preview-text');
    if (langPreview) langPreview.textContent = t.interfaceLang;

    // Update buttons
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) saveProfileBtn.textContent = t.save;

    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) exportBtn.innerHTML = '<i class="fas fa-download"></i> ' + t.exportData;

    const importBtn = document.getElementById('import-data-btn');
    if (importBtn) importBtn.innerHTML = '<i class="fas fa-upload"></i> ' + t.importData;

    const clearBtn = document.getElementById('clear-data-btn');
    if (clearBtn) clearBtn.innerHTML = '<i class="fas fa-trash"></i> ' + t.clearAll;

    const testBtn = document.getElementById('test-ollama-btn');
    if (testBtn) testBtn.textContent = t.testConnection;

    const autoDetectBtn = document.getElementById('auto-detect-region-btn');
    if (autoDetectBtn) autoDetectBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i> ' + t.autoDetect;
}

const quotes = [
    "\"Give a man a fish, and you feed him for a day; teach a man to fish, and you feed him for a lifetime.\"",
    "\"Lifting others up empowers individuals and communities.\"",
    "\"Success is the sum of small efforts, repeated day in and day out.\"",
    "\"Your future is created by what you do today, not tomorrow.\"",
    "\"Focus on being productive instead of busy.\"",
    "\"Education is the passport to the future, for tomorrow belongs to those who prepare for it today.\"",
    "\"The expert in anything was once a beginner.\"",
    "\"Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.\""
];

/* --- STATE --- */
let settings = {};
let tasks = [];
let schedule = {};
let resources = [];
let progress = {};
let reflections = [];
let ollamaConnected = false;
let timerInterval = null;
let timeLeft = 25 * 60;
let timerRunning = false;
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();

/* --- DOM ELEMENTS --- */
let authSection, appContainer, themeToggle, dailyQuote;

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize DOM elements
    authSection = document.getElementById('auth-section');
    appContainer = document.getElementById('app-container');
    themeToggle = document.getElementById('theme-toggle');
    dailyQuote = document.getElementById('daily-quote');

    // Initialize Supabase
    initSupabase();

    // Setup auth event listeners
    setupAuthListeners();

    // Check if user is already logged in via Supabase session
    const session = await getSupabaseSession();
    if (session && session.user) {
        // User is logged in, show app
        showApp();
    } else {
        // Show auth section
        if (authSection) authSection.classList.remove('hidden');
    }

    // Load random quote
    if (dailyQuote) {
        dailyQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
});

// initializeDevUser removed — Supabase Auth handles all user management

function hashPassword(password) {
    // Simple hash for demo purposes (NOT secure for production)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

function setupAuthListeners() {
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.auth-tab.active')?.classList.remove('active');
            document.querySelector('.auth-form.active')?.classList.remove('active');
            tab.classList.add('active');

            const formId = tab.dataset.tab === 'signin' ? 'signin-form' : 'signup-form';
            document.getElementById(formId)?.classList.add('active');

            // Clear errors
            document.getElementById('signin-error').textContent = '';
            document.getElementById('signup-error').textContent = '';
        });
    });

    // Sign In
    const signinBtn = document.getElementById('signin-btn');
    if (signinBtn) {
        signinBtn.addEventListener('click', handleSignIn);
    }

    // Sign Up
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', handleSignUp);
    }

    // Enter key support
    document.getElementById('signin-password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSignIn();
    });
    document.getElementById('signup-confirm')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSignUp();
    });
    document.getElementById('signin-email')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSignIn();
    });
    document.getElementById('signup-email')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('signup-password')?.focus();
    });
}

async function handleSignIn() {
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const errorEl = document.getElementById('signin-error');

    if (!email || !password) {
        errorEl.textContent = 'Please enter both email and password.';
        return;
    }

    // Disable button while signing in
    const signinBtn = document.getElementById('signin-btn');
    if (signinBtn) signinBtn.disabled = true;
    errorEl.textContent = '';

    const { data, error } = await supabaseSignIn(email, password);

    if (error) {
        errorEl.textContent = error.message || 'Sign in failed.';
        if (signinBtn) signinBtn.disabled = false;
        return;
    }

    // Success - show app
    if (signinBtn) signinBtn.disabled = false;
    showApp();
}

async function handleSignUp() {
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const errorEl = document.getElementById('signup-error');

    if (!email || !password || !confirm) {
        errorEl.textContent = 'Please fill in all fields.';
        return;
    }

    if (password !== confirm) {
        errorEl.textContent = 'Passwords do not match.';
        return;
    }

    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters.';
        return;
    }

    // Disable button while signing up
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) signupBtn.disabled = true;
    errorEl.textContent = '';

    const { data, error } = await supabaseSignUp(email, password);

    if (error) {
        errorEl.textContent = error.message || 'Sign up failed.';
        if (signupBtn) signupBtn.disabled = false;
        return;
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
        errorEl.style.color = '#10b981';
        errorEl.textContent = 'Account created! Check your email to confirm, then sign in.';
        if (signupBtn) signupBtn.disabled = false;
        return;
    }

    // Auto-logged in (email confirmation disabled)
    if (signupBtn) signupBtn.disabled = false;
    showApp();
}

function showApp() {
    if (authSection) {
        authSection.style.opacity = '0';
        setTimeout(async () => {
            authSection.classList.add('hidden');
            if (appContainer) appContainer.classList.add('active');

            // Now load user data and initialize app
            try {
                await loadAllData();
                applySettings();
                renderAll();
                setupEventListeners();
                setupSettingsListeners();
                setupReflectionListeners();
                checkOllamaConnection();
                setupClock();
                setupWeather();
            } catch (e) {
                console.error('App initialization error:', e);
            }
        }, 300);
    }
}

async function signOut() {
    await supabaseSignOut();
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    location.reload();
}

/* --- DATA MANAGEMENT --- */
function getCurrentUser() {
    // Still check localStorage for backward compatibility, but Supabase session is primary
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

function isDevUser() {
    return false; // No longer applicable with Supabase auth
}

function getUserStorageKey(baseKey) {
    const currentUser = getCurrentUser();
    return currentUser ? `${baseKey}_${currentUser}` : baseKey;
}

async function loadAllData() {
    // First, try loading from Supabase (cloud)
    const cloudData = await loadFromSupabase();

    if (cloudData) {
        // Use cloud data, merging with defaults for any missing fields
        settings = { ...DEFAULT_SETTINGS, ...(cloudData.settings || {}) };
        tasks = cloudData.tasks || [];
        schedule = (cloudData.schedule && Object.keys(cloudData.schedule).length > 0) ? cloudData.schedule : { ...DEFAULT_SCHEDULE };
        resources = (cloudData.resources && cloudData.resources.length > 0) ? cloudData.resources : [...DEFAULT_RESOURCES];
        progress = { ...DEFAULT_PROGRESS, ...(cloudData.progress || {}) };
        reflections = cloudData.reflections || [];
        console.log('[STUBUU] Loaded data from Supabase cloud');
    } else {
        // Fallback to localStorage
        const userKey = (key) => getUserStorageKey(key);
        settings = JSON.parse(localStorage.getItem(userKey(STORAGE_KEYS.SETTINGS))) || { ...DEFAULT_SETTINGS };
        tasks = JSON.parse(localStorage.getItem(userKey(STORAGE_KEYS.TASKS))) || [];
        schedule = JSON.parse(localStorage.getItem(userKey(STORAGE_KEYS.SCHEDULE))) || { ...DEFAULT_SCHEDULE };
        resources = JSON.parse(localStorage.getItem(userKey(STORAGE_KEYS.RESOURCES))) || [...DEFAULT_RESOURCES];
        progress = JSON.parse(localStorage.getItem(userKey(STORAGE_KEYS.PROGRESS))) || { ...DEFAULT_PROGRESS };
        reflections = JSON.parse(localStorage.getItem(userKey(STORAGE_KEYS.REFLECTIONS))) || [];
        console.log('[STUBUU] Loaded data from localStorage (fallback)');
    }

    // Update streak
    updateStreak();
}

function saveSettings() {
    localStorage.setItem(getUserStorageKey(STORAGE_KEYS.SETTINGS), JSON.stringify(settings));
    triggerCloudSync();
}

function saveTasks() {
    localStorage.setItem(getUserStorageKey(STORAGE_KEYS.TASKS), JSON.stringify(tasks));
    triggerCloudSync();
}

function saveSchedule() {
    localStorage.setItem(getUserStorageKey(STORAGE_KEYS.SCHEDULE), JSON.stringify(schedule));
    triggerCloudSync();
}

function saveResources() {
    localStorage.setItem(getUserStorageKey(STORAGE_KEYS.RESOURCES), JSON.stringify(resources));
    triggerCloudSync();
}

function saveProgress() {
    localStorage.setItem(getUserStorageKey(STORAGE_KEYS.PROGRESS), JSON.stringify(progress));
    triggerCloudSync();
}

function saveReflections() {
    localStorage.setItem(getUserStorageKey(STORAGE_KEYS.REFLECTIONS), JSON.stringify(reflections));
    triggerCloudSync();
}

function updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (progress.lastActiveDate === today) {
        // Already active today
    } else if (progress.lastActiveDate === yesterday) {
        progress.currentStreak++;
        progress.lastActiveDate = today;
        saveProgress();
    } else if (progress.lastActiveDate !== today) {
        progress.currentStreak = 1;
        progress.lastActiveDate = today;
        saveProgress();
    }
}

/* --- SETTINGS APPLICATION --- */
function applySettings() {
    // Apply theme
    if (settings.theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    // Apply accent color
    document.body.classList.remove('accent-green', 'accent-purple', 'accent-orange', 'accent-pink', 'accent-red', 'accent-teal', 'accent-indigo', 'accent-cyan');
    if (settings.accentColor !== 'blue') {
        document.body.classList.add(`accent-${settings.accentColor}`);
    }

    // Apply theme style
    document.body.classList.remove('theme-neon', 'theme-nature', 'theme-minimal', 'theme-retro');
    if (settings.themeStyle && settings.themeStyle !== 'default') {
        document.body.classList.add(`theme-${settings.themeStyle}`);
    }

    // Update sidebar profile
    updateProfileDisplay();

    // Update timer duration
    const timerDuration = document.getElementById('timer-duration');
    if (timerDuration) {
        timerDuration.value = settings.defaultTimerDuration;
        timeLeft = settings.defaultTimerDuration * 60;
        updateTimerDisplay();
    }

    // Update settings form
    const settingsName = document.getElementById('settings-name');
    if (settingsName) settingsName.value = settings.userName;

    const settingsOllamaUrl = document.getElementById('settings-ollama-url');
    if (settingsOllamaUrl) settingsOllamaUrl.value = settings.ollamaUrl;

    // Handle model dropdown - set the saved model if it exists in the options
    const settingsOllamaModel = document.getElementById('settings-ollama-model');
    if (settingsOllamaModel && settings.ollamaModel) {
        const hasModel = [...settingsOllamaModel.options].some(o => o.value === settings.ollamaModel);
        if (hasModel) {
            settingsOllamaModel.value = settings.ollamaModel;
        }
    }

    // Update region label
    const regionLabel = document.getElementById('ollama-region-label');
    if (regionLabel) {
        const regionInfo = getRegionalOllamaUrl();
        regionLabel.textContent = `Detected region: ${regionInfo.label}`;
    }

    const settingsDefaultTimer = document.getElementById('settings-default-timer');
    if (settingsDefaultTimer) settingsDefaultTimer.value = settings.defaultTimerDuration;

    const settingsSoundEnabled = document.getElementById('settings-sound-enabled');
    if (settingsSoundEnabled) settingsSoundEnabled.checked = settings.soundEnabled;

    const settingsTimezone = document.getElementById('settings-timezone');
    if (settingsTimezone) settingsTimezone.value = settings.timezone || 'auto';

    const settingsAccent = document.getElementById('settings-accent');
    if (settingsAccent) settingsAccent.value = settings.accentColor;

    // Update AI character and conscience dropdowns
    const settingsAiCharacter = document.getElementById('settings-ai-character');
    if (settingsAiCharacter) settingsAiCharacter.value = settings.aiCharacter || 'assistant';

    const settingsAiConscience = document.getElementById('settings-ai-conscience');
    if (settingsAiConscience) settingsAiConscience.value = settings.aiConscience || 'moderate';

    // Update AI provider dropdown
    const settingsAiProvider = document.getElementById('settings-ai-provider');
    if (settingsAiProvider) settingsAiProvider.value = settings.aiProvider || 'ollama';

    // Update provider-specific UI visibility
    updateProviderUI();

    // Update language dropdown
    const settingsLanguage = document.getElementById('settings-language');
    if (settingsLanguage) settingsLanguage.value = settings.language || 'en';

    // Apply language translations
    applyLanguage(settings.language || 'en');

    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === settings.theme);
    });

    // Update theme style dropdown
    const settingsThemeStyle = document.getElementById('settings-theme-style');
    if (settingsThemeStyle) settingsThemeStyle.value = settings.themeStyle || 'default';

    // Update color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === settings.avatarColor);
    });
}

function updateProfileDisplay() {
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    const sidebarAvatarIcon = document.getElementById('sidebar-avatar-icon');
    const sidebarAvatarContainer = document.getElementById('sidebar-avatar-container');
    const sidebarUsername = document.getElementById('sidebar-username');
    const settingsAvatarPreview = document.getElementById('settings-avatar-preview');
    const settingsAvatarIcon = document.getElementById('settings-avatar-icon');
    const settingsAvatarContainer = document.getElementById('settings-avatar-container');
    const greetingText = document.getElementById('greeting-text');

    // Update username displays
    if (sidebarUsername) sidebarUsername.textContent = settings.userName;
    if (greetingText) greetingText.textContent = `Welcome, ${settings.userName}!`;

    if (settings.avatarType === 'custom' && settings.customAvatar) {
        // Show custom uploaded image
        if (sidebarAvatar) {
            sidebarAvatar.src = settings.customAvatar;
            sidebarAvatar.style.display = 'block';
        }
        if (sidebarAvatarIcon) sidebarAvatarIcon.style.display = 'none';
        if (sidebarAvatarContainer) sidebarAvatarContainer.style.background = 'transparent';

        if (settingsAvatarPreview) {
            settingsAvatarPreview.src = settings.customAvatar;
            settingsAvatarPreview.style.display = 'block';
        }
        if (settingsAvatarIcon) settingsAvatarIcon.style.display = 'none';
        if (settingsAvatarContainer) settingsAvatarContainer.style.background = 'transparent';

    } else if (settings.avatarType === 'preset' && settings.presetAvatar) {
        // Show FontAwesome icon with colored background
        const bgColor = `#${settings.avatarColor}`;

        if (sidebarAvatar) sidebarAvatar.style.display = 'none';
        if (sidebarAvatarIcon) {
            sidebarAvatarIcon.className = `fas ${settings.presetAvatar} avatar-icon`;
            sidebarAvatarIcon.style.display = 'block';
        }
        if (sidebarAvatarContainer) sidebarAvatarContainer.style.background = bgColor;

        if (settingsAvatarPreview) settingsAvatarPreview.style.display = 'none';
        if (settingsAvatarIcon) {
            settingsAvatarIcon.className = `fas ${settings.presetAvatar} settings-avatar-icon`;
            settingsAvatarIcon.style.display = 'block';
        }
        if (settingsAvatarContainer) settingsAvatarContainer.style.background = bgColor;

    } else {
        // Default: use initials-based avatar from API
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(settings.userName)}&background=${settings.avatarColor}&color=fff&size=128`;

        if (sidebarAvatar) {
            sidebarAvatar.src = avatarUrl;
            sidebarAvatar.style.display = 'block';
        }
        if (sidebarAvatarIcon) sidebarAvatarIcon.style.display = 'none';
        if (sidebarAvatarContainer) sidebarAvatarContainer.style.background = 'transparent';

        if (settingsAvatarPreview) {
            settingsAvatarPreview.src = avatarUrl;
            settingsAvatarPreview.style.display = 'block';
        }
        if (settingsAvatarIcon) settingsAvatarIcon.style.display = 'none';
        if (settingsAvatarContainer) settingsAvatarContainer.style.background = 'transparent';
    }

    // Update preset avatar selection UI
    updatePresetAvatarSelection();
}

function updatePresetAvatarSelection() {
    document.querySelectorAll('.preset-avatar-option').forEach(opt => {
        const avatarData = opt.dataset.avatar;
        let isSelected = false;

        if (avatarData === 'initials' && settings.avatarType === 'initials') {
            isSelected = true;
        } else if (settings.avatarType === 'preset' && settings.presetAvatar === avatarData) {
            isSelected = true;
        }

        opt.classList.toggle('selected', isSelected);
    });
}

/* --- RENDER FUNCTIONS --- */
function renderAll() {
    renderTasks();
    renderSchedule();
    renderResources();
    renderProgress();
    renderAIAvatar();
    renderReflections();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;

    taskList.innerHTML = '';

    const today = new Date().toISOString().split('T')[0];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        let dueDateHtml = '';
        if (task.dueDate) {
            const isOverdue = task.dueDate < today && !task.completed;
            dueDateHtml = `<span class="task-due ${isOverdue ? 'overdue' : ''}">${formatDate(task.dueDate)}</span>`;
        }

        li.innerHTML = `
            <div class="task-content">
                <span>${task.text}</span>
                ${dueDateHtml}
            </div>
            <div class="task-actions">
                <i class="fas fa-check" title="Complete" data-index="${index}"></i>
                <i class="fas fa-trash" title="Delete" data-index="${index}"></i>
            </div>
        `;

        taskList.appendChild(li);
    });

    // Add event listeners
    taskList.querySelectorAll('.fa-check').forEach(btn => {
        btn.addEventListener('click', (e) => toggleTaskComplete(parseInt(e.target.dataset.index)));
    });

    taskList.querySelectorAll('.fa-trash').forEach(btn => {
        btn.addEventListener('click', (e) => deleteTask(parseInt(e.target.dataset.index)));
    });
}

function renderSchedule() {
    const scheduleGrid = document.getElementById('schedule-grid');
    if (!scheduleGrid) return;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    scheduleGrid.innerHTML = '';

    days.forEach((day, index) => {
        const column = document.createElement('div');
        column.className = 'day-column';
        column.innerHTML = `<h4>${dayNames[index]}</h4>`;

        const events = schedule[day] || [];
        events.sort((a, b) => a.time.localeCompare(b.time));

        events.forEach((event, eventIndex) => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.innerHTML = `
                ${event.title}
                <span class="event-time">${formatTime(event.time)}</span>
                <i class="fas fa-times delete-event" data-day="${day}" data-index="${eventIndex}"></i>
            `;
            column.appendChild(slot);
        });

        // Add empty slot
        const emptySlot = document.createElement('div');
        emptySlot.className = 'time-slot empty';
        emptySlot.textContent = '+ Add Event';
        emptySlot.dataset.day = day;
        emptySlot.addEventListener('click', () => openEventModal(day));
        column.appendChild(emptySlot);

        scheduleGrid.appendChild(column);
    });

    // Add delete event listeners
    scheduleGrid.querySelectorAll('.delete-event').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const day = e.target.dataset.day;
            const index = parseInt(e.target.dataset.index);
            schedule[day].splice(index, 1);
            saveSchedule();
            renderSchedule();
        });
    });
}

function renderResources() {
    const container = document.getElementById('resource-container');
    if (!container) return;

    container.innerHTML = '';

    resources.forEach((resource, index) => {
        const item = document.createElement('div');
        item.className = 'resource-item';
        item.innerHTML = `
            <div class="res-icon ${resource.color}"><i class="fas ${resource.icon}"></i></div>
            <div class="res-info">
                <h4>${resource.name}</h4>
                <p>${resource.desc}</p>
                <a href="${resource.url}" target="_blank" class="res-link">Visit Site <i class="fas fa-external-link-alt"></i></a>
            </div>
            <div class="resource-actions">
                <i class="fas fa-pencil-alt edit-resource" data-index="${index}" title="Edit"></i>
                <i class="fas fa-trash delete-resource" data-index="${index}" title="Delete"></i>
            </div>
        `;
        container.appendChild(item);
    });

    // Add delete listeners
    container.querySelectorAll('.delete-resource').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (confirm('Delete this resource?')) {
                resources.splice(index, 1);
                saveResources();
                renderResources();
            }
        });
    });

    // Add edit listeners
    container.querySelectorAll('.edit-resource').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            editResource(index);
        });
    });
}

function renderProgress() {
    // Update stats
    const weeklyFocusTime = document.getElementById('weekly-focus-time');
    const weeklyTasksCompleted = document.getElementById('weekly-tasks-completed');
    const currentStreak = document.getElementById('current-streak');
    const focusSessionsCount = document.getElementById('focus-sessions-count');
    const sessionsToday = document.getElementById('sessions-today');
    const totalFocusTime = document.getElementById('total-focus-time');

    if (weeklyFocusTime) weeklyFocusTime.textContent = formatMinutes(progress.totalFocusMinutes);
    if (weeklyTasksCompleted) weeklyTasksCompleted.textContent = progress.tasksCompleted;
    if (currentStreak) currentStreak.textContent = progress.currentStreak;
    if (focusSessionsCount) focusSessionsCount.textContent = progress.sessionsCompleted;
    if (sessionsToday) sessionsToday.textContent = getSessionsToday();
    if (totalFocusTime) totalFocusTime.textContent = formatMinutes(progress.totalFocusMinutes);

    // Update chart
    renderStudyChart();

    // Update badges
    renderBadges();

    // Update calendar
    renderCalendar();
}

function renderStudyChart() {
    const chart = document.getElementById('study-chart');
    if (!chart) return;

    const categories = ['Math', 'Science', 'English', 'Arts', 'Other'];
    const maxValue = Math.max(...Object.values(progress.weeklyFocusMinutes), 1);

    chart.innerHTML = '';

    categories.forEach(cat => {
        const value = progress.weeklyFocusMinutes[cat] || 0;
        const height = (value / maxValue) * 100;

        const group = document.createElement('div');
        group.className = 'bar-group';
        group.innerHTML = `
            <div class="bar" style="height: ${Math.max(height, 5)}%;"></div>
            <span>${cat}</span>
        `;
        chart.appendChild(group);
    });
}

function renderBadges() {
    const container = document.getElementById('badge-container');
    if (!container) return;

    const badges = [
        { icon: 'fa-fire', name: '7 Day Streak', unlocked: progress.currentStreak >= 7, desc: 'Maintain a 7 day streak' },
        { icon: 'fa-check-double', name: 'Task Master', unlocked: progress.tasksCompleted >= 10, desc: 'Complete 10 tasks' },
        { icon: 'fa-clock', name: 'Scholar', unlocked: progress.totalFocusMinutes >= 600, desc: 'Study for 10 hours' },
        { icon: 'fa-trophy', name: 'Champion', unlocked: progress.sessionsCompleted >= 50, desc: 'Complete 50 focus sessions' },
        { icon: 'fa-star', name: 'Rising Star', unlocked: progress.sessionsCompleted >= 10, desc: 'Complete 10 focus sessions' },
        { icon: 'fa-bolt', name: 'Quick Start', unlocked: progress.sessionsCompleted >= 1, desc: 'Complete your first focus session' }
    ];

    container.innerHTML = '';

    badges.forEach(badge => {
        const div = document.createElement('div');
        div.className = `badge ${badge.unlocked ? 'unlocked' : 'locked'}`;
        div.title = badge.desc;
        div.innerHTML = `
            <i class="fas ${badge.unlocked ? badge.icon : 'fa-lock'}"></i>
            <span>${badge.name}</span>
            <p class="badge-desc">${badge.desc}</p>
        `;

        // Toggle description on click
        div.addEventListener('click', () => {
            // Optional: Close others? For now, just toggle self as requested.
            div.classList.toggle('active');
        });

        container.appendChild(div);
    });
}

function renderCalendar() {
    const daysContainer = document.getElementById('calendar-days');
    const monthYearDisplay = document.getElementById('calendar-month-year');

    if (!daysContainer || !monthYearDisplay) return;

    // Get current date in user's timezone
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Month names array
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    // Update header
    monthYearDisplay.textContent = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;

    // Get first day of month and total days
    const firstDayOfMonth = new Date(currentCalendarYear, currentCalendarMonth, 1);
    const lastDayOfMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Get days from previous month to fill the grid
    const prevMonth = new Date(currentCalendarYear, currentCalendarMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();

    // Get task dates for the current month
    const taskDates = getTaskDatesForMonth(currentCalendarYear, currentCalendarMonth);

    // Clear container
    daysContainer.innerHTML = '';

    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day other-month';
        dayDiv.textContent = day;
        daysContainer.appendChild(dayDiv);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;

        // Check if this is today
        const thisDay = new Date(currentCalendarYear, currentCalendarMonth, day);
        if (thisDay.getTime() === today.getTime()) {
            dayDiv.classList.add('today');
        }

        // Check if there's a task on this day
        const dateStr = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (taskDates.includes(dateStr)) {
            dayDiv.classList.add('has-task');
        }

        daysContainer.appendChild(dayDiv);
    }

    // Add next month's leading days to complete the grid (fill to 42 cells = 6 rows)
    const totalCells = 42;
    const remainingCells = totalCells - (startingDayOfWeek + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day other-month';
        dayDiv.textContent = day;
        daysContainer.appendChild(dayDiv);
    }

    // Setup navigation if not already done
    setupCalendarNavigation();
}

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn && !prevBtn.hasAttribute('data-listener')) {
        prevBtn.setAttribute('data-listener', 'true');
        prevBtn.addEventListener('click', () => navigateCalendar(-1));
    }

    if (nextBtn && !nextBtn.hasAttribute('data-listener')) {
        nextBtn.setAttribute('data-listener', 'true');
        nextBtn.addEventListener('click', () => navigateCalendar(1));
    }
}

function navigateCalendar(direction) {
    currentCalendarMonth += direction;

    if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    } else if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    }

    renderCalendar();
}

function getTaskDatesForMonth(year, month) {
    // Get all task due dates that fall within the specified month
    const taskDates = [];

    tasks.forEach(task => {
        if (task.dueDate) {
            const taskDate = new Date(task.dueDate);
            if (taskDate.getFullYear() === year && taskDate.getMonth() === month) {
                taskDates.push(task.dueDate);
            }
        }
    });

    return taskDates;
}

function toggleAIMaximize() {
    const aiCard = document.getElementById('ai-card');
    const toggleBtn = document.getElementById('toggle-maximize-ai');
    if (!aiCard || !toggleBtn) return;

    const isExpanding = !aiCard.classList.contains('expanded');

    aiCard.classList.toggle('expanded');
    document.body.classList.toggle('ai-maximized-open', isExpanding);

    // Swap icon
    const icon = toggleBtn.querySelector('i');
    if (icon) {
        icon.className = isExpanding ? 'fas fa-compress' : 'fas fa-expand';
    }

    // Update tooltip
    toggleBtn.title = isExpanding ? 'Restore' : 'Maximize';

    // Scroll chat to bottom when maximized
    if (isExpanding) {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            setTimeout(() => {
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 50);
        }
    }
}


function renderAIAvatar() {
    const savedAvatar = localStorage.getItem(STORAGE_KEYS.AI_AVATAR) || 'fa-robot';
    const display = document.getElementById('ai-avatar-display');
    if (display) {
        display.innerHTML = `<i class="fas ${savedAvatar}"></i>`;
    }

    // Update selected in modal
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.icon === savedAvatar);
    });
}

/* --- HELPER FUNCTIONS --- */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
}

function formatMinutes(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

function getSessionsToday() {
    if (!progress.sessionHistory) {
        progress.sessionHistory = [];
    }

    // Safety check just in case
    if (!Array.isArray(progress.sessionHistory)) {
        progress.sessionHistory = [];
    }

    const today = new Date().toDateString();
    return progress.sessionHistory.filter(session => {
        if (!session || !session.date) return false;
        try {
            return new Date(session.date).toDateString() === today;
        } catch (e) {
            return false;
        }
    }).length;
}

function updateTimerDisplay() {
    const display = document.getElementById('timer');
    if (display) {
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        display.textContent = `${m}:${s}`;
    }
}

/* --- NAVIGATION --- */
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(`page-${pageId}`).classList.add('active');

    const navMap = { 'dashboard': 0, 'schedule': 1, 'resources': 2, 'progress': 3, 'reflections': 4, 'settings': 5 };
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems[navMap[pageId]]) {
        navItems[navMap[pageId]].classList.add('active');
    }

    // Refresh data when switching pages
    if (pageId === 'progress') renderProgress();
    if (pageId === 'reflections') renderReflections();
    if (pageId === 'settings') applySettings();
}

/* --- EVENT LISTENERS SETUP --- */
function setupEventListeners() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            settings.theme = isDark ? 'dark' : 'light';
            saveSettings();
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Timer Duration Change
    const timerDuration = document.getElementById('timer-duration');
    if (timerDuration) {
        timerDuration.addEventListener('change', (e) => {
            if (!timerRunning) {
                timeLeft = parseInt(e.target.value) * 60;
                updateTimerDisplay();
            }
        });
    }

    // Timer Controls
    const startBtn = document.getElementById('start-timer');
    const resetBtn = document.getElementById('reset-timer');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (!timerRunning) {
                startTimer();
            } else {
                pauseTimer();
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetTimer);
    }

    // Add Task
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('new-task-input');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }

    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }

    // Chat
    const sendChatBtn = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    // AI Maximize Toggle
    const toggleMaximizeBtn = document.getElementById('toggle-maximize-ai');
    const aiCard = document.getElementById('ai-card');

    if (toggleMaximizeBtn && aiCard) {
        toggleMaximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAIMaximize();
        });
    }

    // Escape key to restore maximized AI
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const aiCard = document.getElementById('ai-card');
            if (aiCard && aiCard.classList.contains('expanded')) {
                toggleAIMaximize();
            }
        }
    });

    // Suggested prompt chips — click to send the prompt
    document.querySelectorAll('.suggested-prompt').forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.dataset.prompt;
            if (prompt) {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) chatInput.value = prompt;
                sendChatMessage();
            }
        });
    });

    // AI Modal
    const aiModal = document.getElementById('ai-modal');
    const openAiSettings = document.getElementById('open-ai-settings');
    const closeModal = document.querySelector('.close-modal');
    const saveAvatar = document.getElementById('save-avatar');

    if (openAiSettings) {
        openAiSettings.addEventListener('click', () => {
            aiModal.style.display = 'flex';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            aiModal.style.display = 'none';
        });
    }

    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelector('.avatar-option.selected')?.classList.remove('selected');
            opt.classList.add('selected');
        });
    });

    if (saveAvatar) {
        saveAvatar.addEventListener('click', () => {
            const selectedIcon = document.querySelector('.avatar-option.selected')?.dataset.icon;
            if (selectedIcon) {
                localStorage.setItem(STORAGE_KEYS.AI_AVATAR, selectedIcon);
                renderAIAvatar();
            }
            aiModal.style.display = 'none';
        });
    }

    // Event Modal
    const eventModal = document.getElementById('event-modal');
    const addEventBtn = document.getElementById('add-event-btn');
    const closeEventModal = document.querySelector('.close-event-modal');
    const saveEventBtn = document.getElementById('save-event-btn');

    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => openEventModal());
    }

    if (closeEventModal) {
        closeEventModal.addEventListener('click', () => {
            eventModal.style.display = 'none';
        });
    }

    if (saveEventBtn) {
        saveEventBtn.addEventListener('click', saveEvent);
    }

    // Resources
    const addResourceBtn = document.getElementById('add-resource-btn');
    const resourceModal = document.getElementById('resource-modal');
    const closeResourceModal = document.querySelector('.close-resource-modal');
    const saveResourceBtn = document.getElementById('save-resource-btn');
    const cancelResourceBtn = document.getElementById('cancel-resource-btn');

    if (addResourceBtn) {
        addResourceBtn.addEventListener('click', () => {
            clearResourceForm();
            resourceModal.style.display = 'flex';
        });
    }

    if (closeResourceModal) {
        closeResourceModal.addEventListener('click', () => {
            resourceModal.style.display = 'none';
        });
    }

    if (saveResourceBtn) {
        saveResourceBtn.addEventListener('click', saveResource);
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === aiModal) aiModal.style.display = 'none';
        if (e.target === eventModal) eventModal.style.display = 'none';
        if (e.target === resourceModal) resourceModal.style.display = 'none';
        if (document.getElementById('reflection-modal') && e.target === document.getElementById('reflection-modal')) {
            document.getElementById('reflection-modal').style.display = 'none';
        }
    });
}

function setupSettingsListeners() {
    // Profile
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('settings-name');
            if (nameInput && nameInput.value.trim()) {
                settings.userName = nameInput.value.trim();
                saveSettings();
                updateProfileDisplay();
                showNotification('Profile saved!');
            }
        });
    }

    // Avatar colors
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.color-btn.active')?.classList.remove('active');
            btn.classList.add('active');
            settings.avatarColor = btn.dataset.color;
            saveSettings();
            updateProfileDisplay();
        });
    });

    // Preset avatar selection
    document.querySelectorAll('.preset-avatar-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const avatarType = opt.dataset.avatar;

            // Clear selected class from all options
            document.querySelectorAll('.preset-avatar-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            if (avatarType === 'initials') {
                settings.avatarType = 'initials';
                settings.presetAvatar = null;
            } else {
                settings.avatarType = 'preset';
                settings.presetAvatar = avatarType;
            }

            // Clear custom avatar when selecting preset
            settings.customAvatar = null;

            saveSettings();
            updateProfileDisplay();
        });
    });

    // Avatar upload button
    const uploadAvatarBtn = document.getElementById('upload-avatar-btn');
    const avatarFileInput = document.getElementById('avatar-file-input');
    const uploadStatus = document.getElementById('upload-status');

    if (uploadAvatarBtn && avatarFileInput) {
        uploadAvatarBtn.addEventListener('click', () => {
            avatarFileInput.click();
        });

        avatarFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                if (uploadStatus) {
                    uploadStatus.textContent = 'Please select an image file';
                    uploadStatus.className = 'upload-status error';
                }
                return;
            }

            // Validate file size (max 500KB to avoid localStorage limits)
            if (file.size > 500 * 1024) {
                if (uploadStatus) {
                    uploadStatus.textContent = 'Image must be under 500KB';
                    uploadStatus.className = 'upload-status error';
                }
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                settings.avatarType = 'custom';
                settings.customAvatar = event.target.result;
                settings.presetAvatar = null;

                // Clear preset selection
                document.querySelectorAll('.preset-avatar-option').forEach(o => o.classList.remove('selected'));

                saveSettings();
                updateProfileDisplay();

                if (uploadStatus) {
                    uploadStatus.textContent = '✓ Image uploaded!';
                    uploadStatus.className = 'upload-status';
                }
            };

            reader.onerror = () => {
                if (uploadStatus) {
                    uploadStatus.textContent = 'Failed to read image';
                    uploadStatus.className = 'upload-status error';
                }
            };

            reader.readAsDataURL(file);
        });
    }

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.theme-btn.active')?.classList.remove('active');
            btn.classList.add('active');
            settings.theme = btn.dataset.theme;
            saveSettings();
            applySettings();
        });
    });

    // Accent color
    const accentSelect = document.getElementById('settings-accent');
    if (accentSelect) {
        accentSelect.addEventListener('change', () => {
            settings.accentColor = accentSelect.value;
            saveSettings();
            applySettings();
        });
    }

    // Timer settings
    const defaultTimerSelect = document.getElementById('settings-default-timer');
    if (defaultTimerSelect) {
        defaultTimerSelect.addEventListener('change', () => {
            settings.defaultTimerDuration = parseInt(defaultTimerSelect.value);
            saveSettings();
        });
    }

    const soundCheckbox = document.getElementById('settings-sound-enabled');
    if (soundCheckbox) {
        soundCheckbox.addEventListener('change', () => {
            settings.soundEnabled = soundCheckbox.checked;
            saveSettings();
        });
    }

    // Timezone setting
    const timezoneSelect = document.getElementById('settings-timezone');
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', () => {
            settings.timezone = timezoneSelect.value;
            saveSettings();
            setupClock(); // Restart clock with new timezone
            showNotification('Time zone updated!');
        });
    }

    // Ollama settings
    const ollamaUrlInput = document.getElementById('settings-ollama-url');
    if (ollamaUrlInput) {
        ollamaUrlInput.addEventListener('change', () => {
            settings.ollamaUrl = ollamaUrlInput.value;
            saveSettings();
            checkOllamaConnection();
        });
    }

    // Auto-detect region button
    const autoDetectBtn = document.getElementById('auto-detect-region-btn');
    if (autoDetectBtn) {
        autoDetectBtn.addEventListener('click', () => {
            const regionInfo = getRegionalOllamaUrl();
            const ollamaUrlInput = document.getElementById('settings-ollama-url');
            if (ollamaUrlInput) {
                ollamaUrlInput.value = regionInfo.url;
                settings.ollamaUrl = regionInfo.url;
                saveSettings();
            }
            const regionLabel = document.getElementById('ollama-region-label');
            if (regionLabel) {
                regionLabel.textContent = `Connected to: ${regionInfo.label}`;
                regionLabel.style.color = 'var(--accent-color, #2563eb)';
            }
            checkOllamaConnection();
            showNotification(`Region set to ${regionInfo.label}`);
        });
    }

    // Model dropdown - dynamically populated from Ollama
    const ollamaModelSelect = document.getElementById('settings-ollama-model');
    if (ollamaModelSelect) {
        ollamaModelSelect.addEventListener('change', () => {
            if (ollamaModelSelect.value) {
                settings.ollamaModel = ollamaModelSelect.value;
                saveSettings();
            }
        });
    }

    // Refresh models button
    const refreshModelsBtn = document.getElementById('refresh-models-btn');
    if (refreshModelsBtn) {
        refreshModelsBtn.addEventListener('click', async () => {
            refreshModelsBtn.querySelector('i').classList.add('fa-spin');
            if (settings.aiProvider === 'puter') {
                await fetchPuterModels();
            } else {
                await fetchOllamaModels();
            }
            refreshModelsBtn.querySelector('i').classList.remove('fa-spin');
            showNotification('Models refreshed!');
        });
    }

    // AI Provider dropdown
    const aiProviderSelect = document.getElementById('settings-ai-provider');
    if (aiProviderSelect) {
        aiProviderSelect.addEventListener('change', () => {
            settings.aiProvider = aiProviderSelect.value;
            saveSettings();
            updateProviderUI();
            showNotification(`AI Provider changed to ${aiProviderSelect.options[aiProviderSelect.selectedIndex].text}`);
        });
    }

    // AI Character and Conscience settings
    const aiCharacterSelect = document.getElementById('settings-ai-character');
    if (aiCharacterSelect) {
        aiCharacterSelect.addEventListener('change', () => {
            settings.aiCharacter = aiCharacterSelect.value;
            saveSettings();
        });
    }

    const aiConscienceSelect = document.getElementById('settings-ai-conscience');
    if (aiConscienceSelect) {
        aiConscienceSelect.addEventListener('change', () => {
            settings.aiConscience = aiConscienceSelect.value;
            saveSettings();
        });
    }

    const testOllamaBtn = document.getElementById('test-ollama-btn');
    if (testOllamaBtn) {
        testOllamaBtn.addEventListener('click', async () => {
            const resultSpan = document.getElementById('ollama-test-result');
            resultSpan.textContent = 'Testing...';
            resultSpan.className = 'test-result';

            const connected = await checkOllamaConnection();
            if (connected) {
                resultSpan.textContent = '✓ Connected!';
                resultSpan.className = 'test-result success';
            } else {
                resultSpan.textContent = '✗ Failed to connect';
                resultSpan.className = 'test-result error';
            }
        });
    }

    // Data management
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }

    const importBtn = document.getElementById('import-data-btn');
    const importInput = document.getElementById('import-file-input');
    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', importData);
    }

    const clearBtn = document.getElementById('clear-data-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    // Theme Style dropdown
    const themeStyleSelect = document.getElementById('settings-theme-style');
    if (themeStyleSelect) {
        themeStyleSelect.addEventListener('change', () => {
            settings.themeStyle = themeStyleSelect.value;
            saveSettings();
            applySettings();
            showNotification(`Theme changed to ${themeStyleSelect.options[themeStyleSelect.selectedIndex].text}!`);
        });
    }

    // Language preference
    const languageSelect = document.getElementById('settings-language');
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            settings.language = languageSelect.value;
            saveSettings();
            applyLanguage(settings.language);
            showNotification(`Language changed to ${languageSelect.options[languageSelect.selectedIndex].text}!`);
        });
    }
}

/* --- TIMER FUNCTIONS --- */
function startTimer() {
    timerRunning = true;
    const startBtn = document.getElementById('start-timer');
    startBtn.textContent = 'Pause';
    startBtn.classList.replace('btn-primary', 'btn-secondary');

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    const startBtn = document.getElementById('start-timer');
    startBtn.textContent = 'Resume';
    startBtn.classList.replace('btn-secondary', 'btn-primary');
}

function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    const duration = parseInt(document.getElementById('timer-duration')?.value || settings.defaultTimerDuration);
    timeLeft = duration * 60;
    updateTimerDisplay();

    const startBtn = document.getElementById('start-timer');
    startBtn.textContent = 'Start Focus';
    startBtn.classList.replace('btn-secondary', 'btn-primary');
}



function completeSession() {
    timerRunning = false;
    clearInterval(timerInterval);

    const duration = parseInt(document.getElementById('timer-duration')?.value || settings.defaultTimerDuration);
    const subject = document.getElementById('focus-subject')?.value || 'Other';

    // Initialize sessionHistory if it doesn't exist
    if (!progress.sessionHistory) {
        progress.sessionHistory = [];
    }

    // Add current session to history
    progress.sessionHistory.push({
        date: new Date().toISOString(),
        duration: duration,
        subject: subject
    });

    // Update progress
    progress.sessionsCompleted++;
    progress.totalFocusMinutes += duration;

    // Update subject-specific progress
    if (!progress.weeklyFocusMinutes) {
        progress.weeklyFocusMinutes = { Math: 0, Science: 0, English: 0, Arts: 0, Other: 0 };
    }
    progress.weeklyFocusMinutes[subject] = (progress.weeklyFocusMinutes[subject] || 0) + duration;

    saveProgress();

    // Play sound
    if (settings.soundEnabled) {
        playNotificationSound();
    }

    // Show notification
    showNotification(`Focus session complete! +${duration} mins for ${subject}`);

    // Reset timer
    resetTimer();

    // Update display
    renderProgress();
}

function playNotificationSound() {
    // Create a simple beep using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillator.start();

        setTimeout(() => {
            oscillator.stop();
        }, 500);
    } catch (e) {
        console.log('Could not play notification sound');
    }
}

function showNotification(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* --- TASK FUNCTIONS --- */
function addTask() {
    const input = document.getElementById('new-task-input');
    const dueDateInput = document.getElementById('task-due-date');

    if (!input.value.trim()) return;

    tasks.push({
        text: input.value.trim(),
        dueDate: dueDateInput?.value || null,
        completed: false,
        createdAt: new Date().toISOString()
    });

    saveTasks();
    renderTasks();

    input.value = '';
    if (dueDateInput) dueDateInput.value = '';
}

function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;

    if (tasks[index].completed) {
        progress.tasksCompleted++;
        saveProgress();
    }

    saveTasks();
    renderTasks();
    renderProgress();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

/* --- SCHEDULE FUNCTIONS --- */
function openEventModal(day = 'monday') {
    const modal = document.getElementById('event-modal');
    const daySelect = document.getElementById('event-day');

    if (daySelect) daySelect.value = day;

    // Clear form
    document.getElementById('event-title').value = '';
    document.getElementById('event-time').value = '';

    modal.style.display = 'flex';
}

function saveEvent() {
    const day = document.getElementById('event-day').value;
    const title = document.getElementById('event-title').value.trim();
    const time = document.getElementById('event-time').value;

    if (!title || !time) {
        showNotification('Please fill in all fields');
        return;
    }

    if (!schedule[day]) schedule[day] = [];

    schedule[day].push({ title, time });
    saveSchedule();
    renderSchedule();

    document.getElementById('event-modal').style.display = 'none';
    showNotification('Event added!');
}

/* --- RESOURCE FUNCTIONS --- */
let editingResourceIndex = -1;

function saveResource() {
    const name = document.getElementById('resource-name').value.trim();
    const desc = document.getElementById('resource-desc').value.trim();
    const url = document.getElementById('resource-url').value.trim();
    const color = document.getElementById('resource-color').value;
    const icon = document.getElementById('resource-icon').value;

    if (!name || !url) {
        showNotification('Please fill in name and URL');
        return;
    }

    if (editingResourceIndex > -1) {
        // Update existing resource
        resources[editingResourceIndex] = {
            ...resources[editingResourceIndex],
            name,
            desc: desc || 'No description',
            url,
            color,
            icon
        };
        showNotification('Resource updated!');
    } else {
        // Create new resource
        resources.push({
            id: Date.now(),
            name,
            desc: desc || 'No description',
            url,
            color,
            icon
        });
        showNotification('Resource added!');
    }

    saveResources();
    renderResources();

    // Reset and hide form
    clearResourceForm();
    document.getElementById('resource-modal').style.display = 'none';
}

function editResource(index) {
    const resource = resources[index];
    if (!resource) return;

    editingResourceIndex = index;

    // Populate form
    document.getElementById('resource-name').value = resource.name;
    document.getElementById('resource-desc').value = resource.desc;
    document.getElementById('resource-url').value = resource.url;
    document.getElementById('resource-color').value = resource.color;
    document.getElementById('resource-icon').value = resource.icon;

    // Update UI for edit mode
    const modal = document.getElementById('resource-modal');
    modal.style.display = 'flex';
    document.getElementById('resource-modal-title').innerHTML = '<i class="fas fa-edit"></i> Edit Resource';
    document.getElementById('save-resource-btn').textContent = 'Update Resource';
}

function clearResourceForm() {
    editingResourceIndex = -1;
    document.getElementById('resource-name').value = '';
    document.getElementById('resource-desc').value = '';
    document.getElementById('resource-url').value = '';
    document.getElementById('resource-color').value = 'blue';
    document.getElementById('resource-icon').value = 'fa-globe';

    // Reset UI to add mode
    document.getElementById('resource-modal-title').innerHTML = '<i class="fas fa-plus-circle"></i> Add New Resource';
    document.getElementById('save-resource-btn').textContent = 'Save Resource';
}

/* --- DATA EXPORT/IMPORT --- */
function exportData() {
    const data = {
        settings,
        tasks,
        schedule,
        resources,
        progress,
        reflections,
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stubuu-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('Data exported!');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (data.settings) {
                settings = { ...DEFAULT_SETTINGS, ...data.settings };
                saveSettings();
            }
            if (data.tasks) {
                tasks = data.tasks;
                saveTasks();
            }
            if (data.schedule) {
                schedule = data.schedule;
                saveSchedule();
            }
            if (data.resources) {
                resources = data.resources;
                saveResources();
            }
            if (data.progress) {
                progress = { ...DEFAULT_PROGRESS, ...data.progress };
                saveProgress();
            }

            if (data.reflections) {
                reflections = data.reflections;
                saveReflections();
            }

            applySettings();
            renderAll();
            showNotification('Data imported successfully!');
        } catch (err) {
            showNotification('Error importing data. Invalid file format.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

/* --- OLLAMA AI INTEGRATION --- */

// Track the last connection error type for better user messaging
let lastConnectionError = '';

async function checkOllamaConnection() {
    const statusDot = document.getElementById('ai-connection-status');

    // If using Puter.js, mark as connected immediately (cloud-based, always available)
    if (settings.aiProvider === 'puter') {
        ollamaConnected = true;
        lastConnectionError = '';
        if (statusDot) {
            statusDot.className = 'status-dot online';
            statusDot.title = 'Puter.js AI: Connected';
        }
        return true;
    }

    if (statusDot) {
        statusDot.className = 'status-dot connecting';
        statusDot.title = 'Ollama: Connecting...';
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${settings.ollamaUrl}/api/tags`, {
            method: 'GET',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            ollamaConnected = true;
            lastConnectionError = '';
            if (statusDot) {
                statusDot.className = 'status-dot online';
                statusDot.title = 'Ollama: Connected';
            }
            // Auto-fetch available models from the server
            await fetchOllamaModels();
            return true;
        } else {
            lastConnectionError = 'server_error';
        }
    } catch (error) {
        console.log('Ollama not available:', error.message);

        // Detect CORS vs connection refused vs timeout
        if (error.name === 'AbortError') {
            lastConnectionError = 'timeout';
        } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            // This typically means CORS blocking or Ollama not running
            // Check if we're on a file:// protocol which almost certainly means CORS
            if (window.location.protocol === 'file:') {
                lastConnectionError = 'cors_file_protocol';
            } else {
                lastConnectionError = 'connection_refused';
            }
        } else if (error instanceof TypeError) {
            lastConnectionError = 'cors_or_network';
        } else {
            lastConnectionError = 'unknown';
        }
    }

    ollamaConnected = false;
    if (statusDot) {
        statusDot.className = 'status-dot offline';
        const errorMessages = {
            cors_file_protocol: 'Ollama: CORS blocked (file:// protocol) - See setup guide',
            cors_or_network: 'Ollama: Network/CORS error - Check setup guide',
            connection_refused: 'Ollama: Not running - Run "ollama serve" in terminal',
            timeout: 'Ollama: Connection timed out',
            server_error: 'Ollama: Server error',
            unknown: 'Ollama: Disconnected - Click settings to configure'
        };
        statusDot.title = errorMessages[lastConnectionError] || errorMessages.unknown;
    }
    return false;
}

async function fetchOllamaModels() {
    const modelSelect = document.getElementById('settings-ollama-model');
    if (!modelSelect) return;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${settings.ollamaUrl}/api/tags`, {
            method: 'GET',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            const models = data.models || [];

            // Clear existing options
            modelSelect.innerHTML = '';

            if (models.length === 0) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.disabled = true;
                opt.selected = true;
                opt.textContent = 'No models installed — run "ollama pull <model>"';
                modelSelect.appendChild(opt);
                return;
            }

            // Populate with installed models
            models.forEach(model => {
                const opt = document.createElement('option');
                opt.value = model.name;
                // Show friendly name with size info
                const sizeGB = (model.size / (1024 * 1024 * 1024)).toFixed(1);
                opt.textContent = `${model.name} (${sizeGB} GB)`;
                modelSelect.appendChild(opt);
            });

            // Select the saved model if it exists, otherwise select the first
            const savedModel = settings.ollamaModel;
            const hasModel = [...modelSelect.options].some(o => o.value === savedModel);
            if (hasModel) {
                modelSelect.value = savedModel;
            } else if (models.length > 0) {
                modelSelect.value = models[0].name;
                settings.ollamaModel = models[0].name;
                saveSettings();
            }
        }
    } catch (error) {
        console.log('Could not fetch models:', error.message);
        modelSelect.innerHTML = '';
        const opt = document.createElement('option');
        opt.value = '';
        opt.disabled = true;
        opt.selected = true;
        opt.textContent = 'Failed to load models — check connection';
        modelSelect.appendChild(opt);
    }
}

/* --- PUTER.JS AI INTEGRATION --- */

async function fetchPuterModels() {
    const modelSelect = document.getElementById('settings-ollama-model');
    if (!modelSelect) return;

    try {
        // Check if Puter SDK is loaded
        if (typeof puter === 'undefined' || !puter.ai) {
            modelSelect.innerHTML = '';
            const opt = document.createElement('option');
            opt.value = '';
            opt.disabled = true;
            opt.selected = true;
            opt.textContent = 'Puter.js SDK not loaded — check internet connection';
            modelSelect.appendChild(opt);
            return;
        }

        const models = await puter.ai.listModels();

        // Clear existing options
        modelSelect.innerHTML = '';

        if (!models || models.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.disabled = true;
            opt.selected = true;
            opt.textContent = 'No models available from Puter.js';
            modelSelect.appendChild(opt);
            return;
        }

        // Populate with Puter.js models
        models.forEach(model => {
            const opt = document.createElement('option');
            opt.value = model.id;
            opt.textContent = model.name ? `${model.name} (${model.provider})` : `${model.id} (${model.provider})`;
            modelSelect.appendChild(opt);
        });

        // Select the saved model if it exists, otherwise select the first
        const savedModel = settings.ollamaModel;
        const hasModel = [...modelSelect.options].some(o => o.value === savedModel);
        if (hasModel) {
            modelSelect.value = savedModel;
        } else if (models.length > 0) {
            modelSelect.value = models[0].id;
            settings.ollamaModel = models[0].id;
            saveSettings();
        }
    } catch (error) {
        console.log('Could not fetch Puter.js models:', error.message);
        modelSelect.innerHTML = '';
        const opt = document.createElement('option');
        opt.value = '';
        opt.disabled = true;
        opt.selected = true;
        opt.textContent = 'Failed to load Puter.js models';
        modelSelect.appendChild(opt);
    }
}

async function callPuterAPI(systemPrompt, userMessage, options = {}) {
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
    ];

    const chatOptions = {
        model: settings.ollamaModel,
        stream: false
    };

    if (options.temperature !== undefined) {
        chatOptions.temperature = options.temperature;
    }
    if (options.max_tokens !== undefined) {
        chatOptions.max_tokens = options.max_tokens;
    }

    const response = await puter.ai.chat(messages, false, chatOptions);

    // Extract text from puter.ai.chat response
    if (response && response.message && response.message.content) {
        return response.message.content.trim();
    }
    if (typeof response === 'string') {
        return response.trim();
    }
    // Fallback: try to convert to string
    return String(response || 'I received your message but got an empty response. Please try again!');
}

function updateProviderUI() {
    const provider = settings.aiProvider || 'ollama';
    const ollamaOnlyElements = document.querySelectorAll('.ollama-only-setting');

    // Show/hide Ollama-specific fields
    ollamaOnlyElements.forEach(el => {
        el.style.display = provider === 'ollama' ? '' : 'none';
    });

    // Update the refresh button tooltip
    const refreshBtn = document.getElementById('refresh-models-btn');
    if (refreshBtn) {
        refreshBtn.title = provider === 'puter' ? 'Refresh Puter.js models' : 'Refresh available models';
    }

    // Update connection status and fetch appropriate models
    if (provider === 'puter') {
        // Mark as connected for Puter.js
        ollamaConnected = true;
        const statusDot = document.getElementById('ai-connection-status');
        if (statusDot) {
            statusDot.className = 'status-dot online';
            statusDot.title = 'Puter.js AI: Connected';
        }
        fetchPuterModels();
    } else {
        checkOllamaConnection();
    }
}

function getConnectionErrorMessage() {
    switch (lastConnectionError) {
        case 'cors_file_protocol':
            return 'I cannot connect because the page is opened as a file (file://). '
                + 'To fix this, either: (1) Set the environment variable OLLAMA_ORIGINS=* and restart Ollama, '
                + 'or (2) Serve this page via a local HTTP server (e.g., run "npx serve ." in the project folder). '
                + 'See LLM_SETUP_GUIDE.md for full instructions.';
        case 'cors_or_network':
            return 'I cannot connect due to a network or CORS error. '
                + 'Make sure Ollama is running and set OLLAMA_ORIGINS=* if needed. '
                + 'Check LLM_SETUP_GUIDE.md for setup instructions.';
        case 'connection_refused':
            return 'Ollama is not running on your computer. '
                + 'Open a terminal and run "ollama serve" to start it, then try again!';
        case 'timeout':
            return 'Connection to Ollama timed out. '
                + 'Make sure Ollama is running and check that the URL in Settings > AI Settings is correct.';
        default:
            return 'I am currently offline. Please make sure Ollama is running '
                + 'and check Settings > AI Settings for configuration. '
                + 'See LLM_SETUP_GUIDE.md for setup instructions.';
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');

    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user-msg');
    input.value = '';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-msg typing';
    typingDiv.textContent = 'Thinking...';
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    requestAnimationFrame(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });

    // Puter.js is always connected, Ollama requires connection check
    const isConnected = settings.aiProvider === 'puter' || ollamaConnected;

    if (isConnected) {
        try {
            const response = await sendToAI(message);
            typingDiv.remove();
            addChatMessage(response, 'bot-msg');
        } catch (error) {
            typingDiv.remove();
            console.error('AI chat error:', error);

            // Provide specific error feedback
            let errorMsg;
            if (settings.aiProvider === 'puter') {
                errorMsg = 'Sorry, I encountered an error with Puter.js AI. Please try again or switch to a different model in Settings.';
            } else if (error.message === 'cors_blocked') {
                errorMsg = 'Request blocked by CORS policy. Set OLLAMA_ORIGINS=* and restart Ollama. See LLM_SETUP_GUIDE.md.';
            } else if (error.message === 'model_not_found') {
                errorMsg = `Model "${settings.ollamaModel}" was not found. Run "ollama pull ${settings.ollamaModel}" in your terminal to download it.`;
            } else if (error.name === 'AbortError' || error.message === 'request_timeout') {
                errorMsg = 'The request timed out. The model may be loading. Please try again in a moment.';
            } else {
                errorMsg = 'Sorry, I encountered an error. Please check if Ollama is running correctly.';
            }

            addChatMessage(errorMsg, 'bot-msg');
            if (settings.aiProvider !== 'puter') checkOllamaConnection();
        }
    } else {
        // Show specific offline message based on detected error
        typingDiv.remove();
        addChatMessage(getConnectionErrorMessage(), 'bot-msg');
    }
}

// Helper: call Ollama API with automatic fallback from /api/chat to /api/generate
async function callOllamaAPI(systemPrompt, userMessage, options = {}) {
    const timeout = options.timeout || 60000;
    const ollamaOptions = options.ollamaOptions || {};

    // Helper to make a fetch with timeout
    async function doFetch(url, body) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        let response;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('request_timeout');
            }
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                throw new Error('cors_blocked');
            }
            throw error;
        }

        if (!response.ok) {
            if (response.status === 404) throw new Error('model_not_found');
            throw new Error(`Ollama request failed with status ${response.status}`);
        }

        return await response.json();
    }

    // Extract text content from Ollama response (handles both /api/chat and /api/generate formats)
    function extractContent(data) {
        // /api/chat format: { message: { role, content } }
        if (data.message && typeof data.message.content === 'string' && data.message.content.trim()) {
            return data.message.content.trim();
        }
        // /api/generate format: { response: "..." }
        if (typeof data.response === 'string' && data.response.trim()) {
            return data.response.trim();
        }
        return '';
    }

    // Attempt 1: Try /api/chat (modern Ollama)
    try {
        console.log('Trying /api/chat endpoint...');
        const chatData = await doFetch(`${settings.ollamaUrl}/api/chat`, {
            model: settings.ollamaModel,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            stream: false,
            options: ollamaOptions
        });

        console.log('Chat API response:', JSON.stringify(chatData).substring(0, 200));
        const chatContent = extractContent(chatData);
        if (chatContent) return chatContent;

        console.log('/api/chat returned empty content, falling back to /api/generate...');
    } catch (chatError) {
        // If it's a critical error (CORS, timeout), don't fallback — rethrow immediately
        if (chatError.message === 'cors_blocked' || chatError.message === 'request_timeout') {
            throw chatError;
        }
        console.log('/api/chat failed, trying /api/generate...', chatError.message);
    }

    // Attempt 2: Fallback to /api/generate (older Ollama versions)
    const generateData = await doFetch(`${settings.ollamaUrl}/api/generate`, {
        model: settings.ollamaModel,
        prompt: userMessage,
        system: systemPrompt,
        stream: false,
        options: ollamaOptions
    });

    console.log('Generate API response:', JSON.stringify(generateData).substring(0, 200));
    const generateContent = extractContent(generateData);
    return generateContent || 'I received your message but got an empty response. Please try again!';
}

async function sendToOllama(message) {
    // Build system prompt based on selected character
    const characterPrompts = {
        assistant: `You are STU-BOT, a friendly and helpful AI study assistant for students. 
Your goal is to help students with their academic questions, provide study tips, and answer learning-related queries.
Keep responses helpful and supportive. Be friendly and approachable. Do not use markdown formatting.`,

        advisor: `You are STU-BOT acting as a wise Strategic Advisor for students.
Your goal is to provide strategic guidance on study planning, goal setting, time management, and academic priorities.
Give thoughtful recommendations on how to approach studies effectively. Help students make smart decisions about their learning path.
Focus on the bigger picture and long-term success strategies. Do not use markdown formatting.`,

        trainer: `You are STU-BOT acting as an intense Study Trainer.
Your goal is to push students with practice problems, quizzes, challenges, and drills.
Be encouraging but demanding. Challenge students to think harder and practice more.
Provide exercises, ask follow-up questions, and test their knowledge actively. Do not use markdown formatting.`,

        teacher: `You are STU-BOT acting as a patient and thorough Teacher.
Your goal is to explain concepts in depth using step-by-step explanations, examples, and analogies.
Break down complex topics into understandable parts. Use clear examples.
Ensure the student truly understands before moving on. Ask if they have follow-up questions. Do not use markdown formatting.`,

        motivator: `You are STU-BOT acting as an enthusiastic Motivator and cheerleader.
Your goal is to boost morale, encourage persistence, and celebrate progress (big or small).
Provide positive reinforcement, inspiring quotes, and energy. help students overcome procrastination and doubt.
Be high energy and supportive. Do not use markdown formatting.`
    };

    // Get conscience parameters (response style)
    const conscienceParams = {
        smart: { temperature: 0.6, num_predict: 400 },      // Detailed, thorough
        moderate: { temperature: 0.7, num_predict: 200 },   // Balanced
        fast: { temperature: 0.8, num_predict: 80 }         // Quick, concise
    };

    const character = settings.aiCharacter || 'assistant';
    const conscience = settings.aiConscience || 'moderate';

    const systemPrompt = characterPrompts[character] || characterPrompts.assistant;
    const params = conscienceParams[conscience] || conscienceParams.moderate;

    return await callOllamaAPI(systemPrompt, message, {
        timeout: 60000,
        ollamaOptions: {
            temperature: params.temperature,
            num_predict: params.num_predict
        }
    });
}

// Unified AI message sender — routes to the correct provider
async function sendToAI(message) {
    if (settings.aiProvider === 'puter') {
        return await sendToPuter(message);
    }
    return await sendToOllama(message);
}

async function sendToPuter(message) {
    // Build system prompt based on selected character (reuses same prompts as Ollama)
    const characterPrompts = {
        assistant: `You are STU-BOT, a friendly and helpful AI study assistant for students. 
Your goal is to help students with their academic questions, provide study tips, and answer learning-related queries.
Keep responses helpful and supportive. Be friendly and approachable. Do not use markdown formatting.`,

        advisor: `You are STU-BOT acting as a wise Strategic Advisor for students.
Your goal is to provide strategic guidance on study planning, goal setting, time management, and academic priorities.
Give thoughtful recommendations on how to approach studies effectively. Help students make smart decisions about their learning path.
Focus on the bigger picture and long-term success strategies. Do not use markdown formatting.`,

        trainer: `You are STU-BOT acting as an intense Study Trainer.
Your goal is to push students with practice problems, quizzes, challenges, and drills.
Be encouraging but demanding. Challenge students to think harder and practice more.
Provide exercises, ask follow-up questions, and test their knowledge actively. Do not use markdown formatting.`,

        teacher: `You are STU-BOT acting as a patient and thorough Teacher.
Your goal is to explain concepts in depth using step-by-step explanations, examples, and analogies.
Break down complex topics into understandable parts. Use clear examples.
Ensure the student truly understands before moving on. Ask if they have follow-up questions. Do not use markdown formatting.`,

        motivator: `You are STU-BOT acting as an enthusiastic Motivator and cheerleader.
Your goal is to boost morale, encourage persistence, and celebrate progress (big or small).
Provide positive reinforcement, inspiring quotes, and energy. help students overcome procrastination and doubt.
Be high energy and supportive. Do not use markdown formatting.`
    };

    const conscienceParams = {
        smart: { temperature: 0.6, max_tokens: 400 },
        moderate: { temperature: 0.7, max_tokens: 200 },
        fast: { temperature: 0.8, max_tokens: 80 }
    };

    const character = settings.aiCharacter || 'assistant';
    const conscience = settings.aiConscience || 'moderate';

    const systemPrompt = characterPrompts[character] || characterPrompts.assistant;
    const params = conscienceParams[conscience] || conscienceParams.moderate;

    return await callPuterAPI(systemPrompt, message, {
        temperature: params.temperature,
        max_tokens: params.max_tokens
    });
}

function addChatMessage(text, className) {
    const chatWindow = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.className = `message ${className}`;

    // Hide the welcome state on first user message
    if (className.includes('user-msg')) {
        const welcome = document.getElementById('chat-welcome');
        if (welcome) welcome.style.display = 'none';
    }

    // Clean up markdown asterisks from AI response if it's a bot message
    if (className.includes('bot-msg')) {
        text = text.replace(/\*\*(.*?)\*\*/g, '$1')  // Bold
            .replace(/\*(.*?)\*/g, '$1');      // Italic
    }

    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    requestAnimationFrame(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
}

// Periodically check Ollama connection
setInterval(() => {
    if (document.visibilityState === 'visible' && settings.aiProvider !== 'puter') {
        checkOllamaConnection();
    }
}, 30000);

// Make functions available globally
window.showPage = showPage;
window.signOut = signOut;

/* --- REFLECTIONS FEATURE --- */

const MOOD_ICONS = {
    great: 'fa-face-grin-stars',
    good: 'fa-face-smile',
    okay: 'fa-face-meh',
    tough: 'fa-face-frown',
    struggling: 'fa-face-sad-tear'
};

const MOOD_LABELS = {
    great: 'Great',
    good: 'Good',
    okay: 'Okay',
    tough: 'Tough',
    struggling: 'Struggling'
};

function renderReflections() {
    const container = document.getElementById('reflections-container');
    const emptyState = document.getElementById('reflections-empty');
    if (!container) return;

    // Remove all existing reflection cards (keep empty state div)
    container.querySelectorAll('.reflection-card').forEach(el => el.remove());

    if (reflections.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Sort by weekOf date descending (newest first)
    const sorted = [...reflections].sort((a, b) => new Date(b.weekOf) - new Date(a.weekOf));

    sorted.forEach(ref => {
        const card = document.createElement('div');
        card.className = 'reflection-card card';
        card.dataset.id = ref.id;

        const weekLabel = formatReflectionDate(ref.weekOf);
        const moodIcon = MOOD_ICONS[ref.mood] || 'fa-face-meh';
        const moodLabel = MOOD_LABELS[ref.mood] || 'Okay';

        card.innerHTML = `
            <div class="reflection-card-header">
                <div class="reflection-week-info">
                    <h4><i class="fas fa-calendar-week"></i> ${weekLabel}</h4>
                    <span class="reflection-mood" title="${moodLabel}"><i class="fas ${moodIcon}"></i> ${moodLabel}</span>
                </div>
                <div class="reflection-actions">
                    <button class="btn-icon" title="Edit" onclick="editReflection('${ref.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-icon-danger" title="Delete" onclick="deleteReflection('${ref.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>

            <div class="reflection-sections">
                <div class="reflection-section">
                    <span class="reflection-section-label"><i class="fas fa-trophy"></i> Achievements</span>
                    <p>${escapeHtml(ref.achievements)}</p>
                </div>
                ${ref.challenges ? `<div class="reflection-section">
                    <span class="reflection-section-label"><i class="fas fa-bolt"></i> Challenges</span>
                    <p>${escapeHtml(ref.challenges)}</p>
                </div>` : ''}
                ${ref.goals ? `<div class="reflection-section">
                    <span class="reflection-section-label"><i class="fas fa-bullseye"></i> Goals for Next Week</span>
                    <p>${escapeHtml(ref.goals)}</p>
                </div>` : ''}
            </div>

            <div class="reflection-ai-section">
                <button class="btn-ai-coach" onclick="getAIReflectionSuggestion('${ref.id}')">
                    <i class="fas fa-robot"></i> Get AI Coaching
                </button>
                <div class="ai-suggestion-container" id="ai-suggestion-${ref.id}" style="display: ${ref.aiSuggestion ? 'block' : 'none'};">
                    <div class="ai-suggestion-content">
                        <i class="fas fa-lightbulb"></i>
                        <span>${ref.aiSuggestion ? escapeHtml(ref.aiSuggestion) : ''}</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatReflectionDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `Week of ${date.toLocaleDateString('en-US', options)}`;
}

function openReflectionModal(editId = null) {
    const modal = document.getElementById('reflection-modal');
    const title = document.getElementById('reflection-modal-title');
    const weekInput = document.getElementById('reflection-week');
    const achievementsInput = document.getElementById('reflection-achievements');
    const challengesInput = document.getElementById('reflection-challenges');
    const goalsInput = document.getElementById('reflection-goals');
    const editIdInput = document.getElementById('reflection-edit-id');

    if (!modal) return;

    // Reset mood selection
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));

    if (editId) {
        const ref = reflections.find(r => r.id === editId);
        if (!ref) return;
        title.textContent = 'Edit Reflection';
        weekInput.value = ref.weekOf;
        achievementsInput.value = ref.achievements;
        challengesInput.value = ref.challenges || '';
        goalsInput.value = ref.goals || '';
        editIdInput.value = ref.id;
        // Set mood
        const moodBtn = document.querySelector(`.mood-btn[data-mood="${ref.mood}"]`);
        if (moodBtn) moodBtn.classList.add('active');
    } else {
        title.textContent = 'Add Weekly Reflection';
        weekInput.value = getWeekStartDate();
        achievementsInput.value = '';
        challengesInput.value = '';
        goalsInput.value = '';
        editIdInput.value = '';
        // Default mood to 'good'
        const goodBtn = document.querySelector('.mood-btn[data-mood="good"]');
        if (goodBtn) goodBtn.classList.add('active');
    }

    modal.style.display = 'flex';
}

function closeReflectionModal() {
    const modal = document.getElementById('reflection-modal');
    if (modal) modal.style.display = 'none';
}

function getWeekStartDate() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, ...
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(now.setDate(diff));
    return monday.toISOString().split('T')[0];
}

function saveReflection() {
    const weekOf = document.getElementById('reflection-week').value;
    const achievements = document.getElementById('reflection-achievements').value.trim();
    const challenges = document.getElementById('reflection-challenges').value.trim();
    const goals = document.getElementById('reflection-goals').value.trim();
    const editId = document.getElementById('reflection-edit-id').value;
    const activeMood = document.querySelector('.mood-btn.active');
    const mood = activeMood ? activeMood.dataset.mood : 'okay';

    if (!weekOf || !achievements) {
        showNotification('Please fill in at least the week and achievements.');
        return;
    }

    if (editId) {
        // Update existing
        const index = reflections.findIndex(r => r.id === editId);
        if (index !== -1) {
            reflections[index].weekOf = weekOf;
            reflections[index].achievements = achievements;
            reflections[index].challenges = challenges;
            reflections[index].goals = goals;
            reflections[index].mood = mood;
        }
    } else {
        // Create new
        reflections.push({
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            weekOf,
            achievements,
            challenges,
            goals,
            mood,
            aiSuggestion: null,
            createdAt: new Date().toISOString()
        });
    }

    saveReflections();
    renderReflections();
    closeReflectionModal();
    showNotification(editId ? 'Reflection updated!' : 'Reflection saved!');
}

function editReflection(id) {
    openReflectionModal(id);
}

function deleteReflection(id) {
    if (!confirm('Are you sure you want to delete this reflection?')) return;
    reflections = reflections.filter(r => r.id !== id);
    saveReflections();
    renderReflections();
    showNotification('Reflection deleted.');
}

async function getAIReflectionSuggestion(id) {
    const ref = reflections.find(r => r.id === id);
    if (!ref) return;

    const suggestionContainer = document.getElementById(`ai-suggestion-${id}`);
    if (!suggestionContainer) return;

    // Show loading state
    suggestionContainer.style.display = 'block';
    suggestionContainer.innerHTML = `
        <div class="ai-suggestion-content ai-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>STU-BOT is analyzing your reflection...</span>
        </div>
    `;

    // Build a mood-aware coaching tone
    const moodLabel = MOOD_LABELS[ref.mood] || 'Okay';
    const moodContext = {
        great: 'The user is feeling great this week! Match their positive energy and help them build on this momentum.',
        good: 'The user is feeling good. Reinforce their positivity and help them keep the streak going.',
        okay: 'The user feels okay — not bad, but not excited either. Help reignite their motivation with practical wins they can achieve quickly.',
        bad: 'The user is feeling down this week. Be extra gentle, empathetic, and encouraging. Focus on small wins and remind them that tough weeks are temporary.',
        awful: 'The user is really struggling right now. Be very compassionate and supportive. Prioritize their wellbeing over productivity. Suggest manageable steps and remind them it is okay to take a breath.'
    };

    const studentName = settings.userName || 'Student';

    const reflectionPrompt = `You are personally coaching someone named ${studentName}. They just shared their weekly reflection and need your direct, personalized feedback.

CRITICAL INSTRUCTION: First, read their reflection carefully and identify what DOMAIN or ACTIVITY they are reflecting about. It could be anything — reading books, studying for exams, exercising, learning an instrument, coding projects, creative writing, sports, personal development, work tasks, or anything else. Your coaching advice MUST be relevant to the specific activity they are doing. Do NOT assume they are studying unless they explicitly mention studying. For example:
- If they talk about reading books → give advice about reading habits, book selection, staying engaged with reading
- If they talk about exercise → give advice about training consistency, recovery, fitness goals
- If they talk about coding → give advice about programming practices, debugging, learning new tech
- If they talk about studying → give advice about study techniques, focus, exam prep
Always match your advice to THEIR actual activity.

--- THEIR REFLECTION (Week of ${ref.weekOf}) ---

What they achieved: "${ref.achievements}"
${ref.challenges ? `What they struggled with: "${ref.challenges}"` : 'They did not mention any specific challenges.'}
${ref.goals ? `What they want to do next week: "${ref.goals}"` : 'They have not set specific goals for next week.'}
Their mood this week: ${moodLabel}

--- YOUR COACHING INSTRUCTIONS ---

${moodContext[ref.mood] || moodContext.okay}

Address ${studentName} directly by name. Your response MUST:
1. Identify what activity or domain they are reflecting on, and tailor ALL advice to that specific area
2. Specifically acknowledge what they achieved — mention their actual accomplishments, not just "great job"
3. ${ref.challenges ? `Directly address their specific challenges ("${ref.challenges.substring(0, 80)}") with 1-2 concrete strategies relevant to THEIR activity that they can try THIS week` : 'Encourage them to identify one area they want to improve in their specific domain'}
4. ${ref.goals ? `Help them work toward their goal ("${ref.goals.substring(0, 80)}") with 2-3 small, actionable steps that make sense for THEIR activity` : 'Suggest one specific, achievable goal based on their achievements'}
5. End with a short motivational thought that connects to THEIR specific situation

Keep it under 200 words, conversational, and warm. Do not use markdown formatting or bullet points — write in natural flowing sentences as if talking face to face.`;

    try {
        // Check connection based on active provider
        const isConnected = settings.aiProvider === 'puter' || ollamaConnected;
        if (!isConnected) {
            throw new Error('not_connected');
        }

        const coachSystem = `You are STU-BOT, a warm and adaptive AI personal coach. You are NOT just a study coach — you adapt to whatever the user is reflecting about. If they are reading books, you become a reading coach. If they are exercising, you become a fitness coach. If they are studying, you become a study coach. You identify the domain from the user's own words and give advice that is specific and relevant to THAT activity. You always address the user by name (${studentName}), reference their specific words, and tailor your tone to their emotional state. You never give generic advice. You speak naturally as if having a one-on-one conversation. Do not use markdown formatting, bullet points, or numbered lists.`;

        let suggestion;
        if (settings.aiProvider === 'puter') {
            suggestion = await callPuterAPI(coachSystem, reflectionPrompt, {
                temperature: 0.65,
                max_tokens: 350
            });
        } else {
            suggestion = await callOllamaAPI(coachSystem, reflectionPrompt, {
                timeout: 60000,
                ollamaOptions: {
                    temperature: 0.65,
                    num_predict: 350
                }
            });
        }

        // Save suggestion
        ref.aiSuggestion = suggestion;
        saveReflections();

        // Display
        suggestionContainer.innerHTML = `
            <div class="ai-suggestion-content">
                <i class="fas fa-lightbulb"></i>
                <span>${escapeHtml(suggestion)}</span>
            </div>
        `;
    } catch (err) {
        let errorMsg = 'Could not connect to AI. ';
        if (err.message === 'not_connected') {
            errorMsg = settings.aiProvider === 'puter'
                ? 'Puter.js AI is not available. Please check your internet connection.'
                : getConnectionErrorMessage();
        } else if (settings.aiProvider === 'puter') {
            errorMsg = 'Sorry, I encountered an error with Puter.js AI. Please try again or switch to a different model in Settings.';
        } else if (err.message === 'model_not_found') {
            errorMsg = `Model "${settings.ollamaModel}" was not found. Run "ollama pull ${settings.ollamaModel}" in your terminal.`;
        } else if (err.message === 'cors_blocked' || (err instanceof TypeError && err.message.includes('Failed to fetch'))) {
            errorMsg = 'Request blocked by CORS. Set OLLAMA_ORIGINS=* and restart Ollama. See LLM_SETUP_GUIDE.md.';
        } else if (err.name === 'AbortError') {
            errorMsg = 'Request timed out. The model may still be loading. Please try again.';
        } else {
            errorMsg += 'Please try again later.';
        }
        suggestionContainer.innerHTML = `
            <div class="ai-suggestion-content ai-error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${errorMsg}</span>
            </div>
        `;
    }
}

function setupReflectionListeners() {
    // Add button
    const addBtn = document.getElementById('add-reflection-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => openReflectionModal());
    }

    // Save button
    const saveBtn = document.getElementById('save-reflection-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveReflection);
    }

    // Close modal
    const closeBtn = document.querySelector('.close-reflection-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeReflectionModal);
    }

    // Close on outside click
    const modal = document.getElementById('reflection-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeReflectionModal();
        });
    }

    // Mood buttons
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Make reflection functions available globally
window.editReflection = editReflection;
window.deleteReflection = deleteReflection;
window.getAIReflectionSuggestion = getAIReflectionSuggestion;

/* --- NEW FEATURES IMPLEMENTATION --- */
function setupClock() {
    const clockDisplay = document.getElementById('clock-display');
    if (!clockDisplay) return;

    // Clear any existing clock interval
    if (window._clockInterval) clearInterval(window._clockInterval);

    function updateClock() {
        const now = new Date();
        const tz = settings.timezone && settings.timezone !== 'auto' ? settings.timezone : undefined;
        const options = { hour: '2-digit', minute: '2-digit' };
        if (tz) options.timeZone = tz;
        clockDisplay.textContent = now.toLocaleTimeString([], options);
    }
    updateClock();
    window._clockInterval = setInterval(updateClock, 1000);
}

function setupWeather() {
    const weatherDisplay = document.getElementById('weather-display');
    const weatherText = document.getElementById('weather-text');
    if (!weatherDisplay || !weatherText) return;

    if (!navigator.geolocation) {
        weatherText.textContent = 'Data unavailable';
        return;
    }

    // Try to get cached location/weather or fetch new
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            if (!response.ok) throw new Error('Weather API failed');

            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            const weatherCode = data.current_weather.weathercode;

            // Simple WMO code mapping
            let iconClass = 'fa-sun';
            if (weatherCode > 3) iconClass = 'fa-cloud-sun';
            if (weatherCode > 45) iconClass = 'fa-cloud';
            if (weatherCode > 50) iconClass = 'fa-cloud-rain';
            if (weatherCode > 70) iconClass = 'fa-snowflake';
            if (weatherCode > 95) iconClass = 'fa-bolt';

            weatherText.textContent = `${temp}°C`;
            const icon = weatherDisplay.querySelector('i');
            if (icon) icon.className = `fas ${iconClass}`;

        } catch (e) {
            console.error('Weather error:', e);
            weatherText.textContent = 'Weather error';
        }
    }, (err) => {
        console.warn('Geolocation denied:', err);
        weatherText.textContent = 'Loc. denied';
    });
}