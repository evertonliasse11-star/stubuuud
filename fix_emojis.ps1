# Fix index.html and script.js - replace emojis with FontAwesome icons
# Using ConvertFromUtf32 for characters above U+FFFF

$htmlPath = Join-Path $PSScriptRoot "index.html"
$html = [System.IO.File]::ReadAllText($htmlPath)

# Helper for surrogate pair emojis
function E($codepoint) { return [char]::ConvertFromUtf32($codepoint) }

# Modal labels
$html = $html.Replace((E 0x1F3C6) + " Achievements & Highlights", '<i class="fas fa-trophy"></i> Achievements & Highlights')
$html = $html.Replace([string][char]0x26A1 + " Challenges Faced", '<i class="fas fa-bolt"></i> Challenges Faced')
$html = $html.Replace((E 0x1F3AF) + " Goals for Next Week", '<i class="fas fa-bullseye"></i> Goals for Next Week')
$html = $html.Replace((E 0x1F60A) + " How was your week?", '<i class="fas fa-heart"></i> How was your week?')

# Mood buttons
$html = $html.Replace(
    '<button class="mood-btn" data-mood="great" title="Great">' + (E 0x1F60A) + '</button>',
    '<button class="mood-btn mood-great" data-mood="great" title="Great"><i class="fas fa-face-grin-stars"></i><span>Great</span></button>'
)
$html = $html.Replace(
    '<button class="mood-btn" data-mood="good" title="Good">' + (E 0x1F642) + '</button>',
    '<button class="mood-btn mood-good" data-mood="good" title="Good"><i class="fas fa-face-smile"></i><span>Good</span></button>'
)
$html = $html.Replace(
    '<button class="mood-btn" data-mood="okay" title="Okay">' + (E 0x1F610) + '</button>',
    '<button class="mood-btn mood-okay" data-mood="okay" title="Okay"><i class="fas fa-face-meh"></i><span>Okay</span></button>'
)
$html = $html.Replace(
    '<button class="mood-btn" data-mood="tough" title="Tough">' + (E 0x1F614) + '</button>',
    '<button class="mood-btn mood-tough" data-mood="tough" title="Tough"><i class="fas fa-face-frown"></i><span>Tough</span></button>'
)
$html = $html.Replace(
    '<button class="mood-btn" data-mood="struggling" title="Struggling">' + (E 0x1F61E) + '</button>',
    '<button class="mood-btn mood-struggling" data-mood="struggling" title="Struggling"><i class="fas fa-face-sad-tear"></i><span>Hard</span></button>'
)

[System.IO.File]::WriteAllText($htmlPath, $html)
Write-Host "HTML emojis replaced successfully"

# Fix script.js
$jsPath = Join-Path $PSScriptRoot "script.js"
$js = [System.IO.File]::ReadAllText($jsPath)

# Replace MOOD_EMOJIS with MOOD_ICONS
$oldBlock = "const MOOD_EMOJIS = {`r`n    great: '" + (E 0x1F60A) + "',`r`n    good: '" + (E 0x1F642) + "',`r`n    okay: '" + (E 0x1F610) + "',`r`n    tough: '" + (E 0x1F614) + "',`r`n    struggling: '" + (E 0x1F61E) + "'`r`n};"

$newBlock = @"
const MOOD_ICONS = {
    great: 'fa-face-grin-stars',
    good: 'fa-face-smile',
    okay: 'fa-face-meh',
    tough: 'fa-face-frown',
    struggling: 'fa-face-sad-tear'
};
"@

$js = $js.Replace($oldBlock, $newBlock)

# Replace emoji usage in renderReflections
$js = $js.Replace(
    "const moodEmoji = MOOD_EMOJIS[ref.mood] || '" + (E 0x1F610) + "';",
    "const moodIcon = MOOD_ICONS[ref.mood] || 'fa-face-meh';"
)
$js = $js.Replace('${moodEmoji} ${moodLabel}', '<i class="fas ${moodIcon}"></i> ${moodLabel}')

[System.IO.File]::WriteAllText($jsPath, $js)
Write-Host "JS emojis replaced successfully"
