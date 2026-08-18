/* =====================================================================
   VL STUDY ABROAD - UNIVERSITIES & SCHOLARSHIPS LIST
   =====================================================================
   HOW TO UPDATE (no coding needed - just edit the list below):

   Each university is one { ... } block. Copy a block, paste it, and edit.
   Fields:
     country     : "France"  or  "Italy"
     name        : university name
     city        : city
     fields      : popular subjects (short)
     scholarship : short scholarship name/description
     status      : "open"  (green)  |  "soon"  (closing soon, amber)  |  "closed" (grey)
     intake      : e.g. "Fall 2026"
     deadline    : e.g. "See official site" or a real date you have
     link        : the university's OFFICIAL website (https://...)

   To mark a university closed for now, set  status: "closed".
   Save the file, upload to GitHub -> Vercel updates the site.
   (Only facts + your own words are used here - no logos or copied text.)
   ===================================================================== */

window.VL_UNIVERSITIES = [
  /* ---------------- FRANCE ---------------- */
  { country:"France", name:"Universite Paris-Saclay", city:"Paris / Orsay", fields:"Sciences, Engineering, Data, Business",
    scholarship:"France Excellence & Eiffel scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.universite-paris-saclay.fr/en" },

  { country:"France", name:"Universite PSL (Paris Sciences & Lettres)", city:"Paris", fields:"Sciences, Humanities, Arts",
    scholarship:"PSL & Eiffel Excellence scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://psl.eu/en" },

  { country:"France", name:"Sorbonne University", city:"Paris", fields:"Arts, Sciences, Medicine",
    scholarship:"Eiffel & faculty scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.sorbonne-universite.fr/en" },

  { country:"France", name:"Sciences Po", city:"Paris / Reims", fields:"Political Science, Economics, International Affairs",
    scholarship:"Emile Boutmy Scholarship", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.sciencespo.fr/en/" },

  { country:"France", name:"Universite Grenoble Alpes", city:"Grenoble", fields:"Engineering, Science, Management",
    scholarship:"IDEX & Eiffel scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.univ-grenoble-alpes.fr/english/" },

  { country:"France", name:"Universite de Strasbourg", city:"Strasbourg", fields:"Sciences, Law, Humanities",
    scholarship:"University & Eiffel scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://en.unistra.fr/" },

  { country:"France", name:"Universite Cote d'Azur", city:"Nice", fields:"AI, Science, Economics",
    scholarship:"IDEX international scholarships", status:"soon", intake:"Fall 2026", deadline:"See official site",
    link:"https://univ-cotedazur.eu/" },

  { country:"France", name:"Universite de Lorraine", city:"Nancy / Metz", fields:"Engineering, Sciences",
    scholarship:"Lorraine & Eiffel scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://welcome.univ-lorraine.fr/en/" },

  /* ---------------- ITALY ---------------- */
  { country:"Italy", name:"Politecnico di Milano", city:"Milan", fields:"Engineering, Architecture, Design",
    scholarship:"Merit tuition waiver + grant", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.polimi.it/en" },

  { country:"Italy", name:"University of Bologna", city:"Bologna", fields:"All fields",
    scholarship:"Unibo Study Grants (waiver + stipend)", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.unibo.it/en" },

  { country:"Italy", name:"University of Padua (Padova)", city:"Padua", fields:"Sciences, Engineering, Medicine",
    scholarship:"Padua International Excellence Scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.unipd.it/en/" },

  { country:"Italy", name:"Sapienza University of Rome", city:"Rome", fields:"All fields",
    scholarship:"Sapienza & DSU Lazio scholarships", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.uniroma1.it/en/" },

  { country:"Italy", name:"Politecnico di Torino", city:"Turin", fields:"Engineering, Architecture",
    scholarship:"Merit scholarships (TOP-UIC)", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.polito.it/en" },

  { country:"Italy", name:"University of Milan (Statale)", city:"Milan", fields:"Sciences, Medicine, Humanities",
    scholarship:"University grants + DSU Lombardia", status:"soon", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.unimi.it/en" },

  { country:"Italy", name:"University of Pavia", city:"Pavia", fields:"Sciences, Medicine, Economics",
    scholarship:"UNIPV international scholarships + EDiSU", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://web-en.unipv.it/" },

  { country:"Italy", name:"Bocconi University", city:"Milan", fields:"Economics, Management, Finance, Law",
    scholarship:"Bocconi Merit & Need-based Awards", status:"open", intake:"Fall 2026", deadline:"See official site",
    link:"https://www.unibocconi.eu/" }
];

/* ---------------- Renderer (no need to edit below) ---------------- */
(function () {
  var list = document.getElementById('uniList');
  if (!list || !window.VL_UNIVERSITIES) return;

  var tabs = document.getElementById('uniTabs');
  var openChk = document.getElementById('uniOpen');
  var schChk = document.getElementById('uniSch');
  var flag = { France: '\u{1F1EB}\u{1F1F7}', Italy: '\u{1F1EE}\u{1F1F9}' };
  var statusText = { open: 'Open', soon: 'Closing soon', closed: 'Closed' };

  var state = { country: 'all', openOnly: false, schOnly: false };

  // pre-filter from the URL hash (#france / #italy)
  var hash = (location.hash || '').toLowerCase();
  if (hash.indexOf('france') > -1) state.country = 'France';
  else if (hash.indexOf('italy') > -1) state.country = 'Italy';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function card(u) {
    var st = u.status || 'open';
    return '<article class="uni-card">' +
      '<div class="uni-top"><span class="uni-flag">' + (flag[u.country] || '') + '</span>' +
      '<span class="uni-status uni-status--' + st + '">' + (statusText[st] || 'Open') + '</span></div>' +
      '<h3>' + esc(u.name) + '</h3>' +
      '<p class="uni-meta">' + esc(u.city) + ' &middot; ' + esc(u.fields) + '</p>' +
      (u.scholarship ? '<p class="uni-sch"><span class="tag-sch">Scholarship</span> ' + esc(u.scholarship) + '</p>' : '') +
      '<p class="uni-deadline">Intake: ' + esc(u.intake || '-') + ' &middot; Deadline: ' + esc(u.deadline || 'See official site') + '</p>' +
      '<div class="uni-actions">' +
      '<a class="btn btn-navy btn-sm" href="' + esc(u.link) + '" target="_blank" rel="noopener">Official site ↗</a>' +
      '<a class="btn btn-outline btn-sm" href="contact.html">Enquire</a>' +
      '</div></article>';
  }

  function render() {
    var items = window.VL_UNIVERSITIES.filter(function (u) {
      if (state.country !== 'all' && u.country !== state.country) return false;
      if (state.openOnly && u.status !== 'open') return false;
      if (state.schOnly && !u.scholarship) return false;
      return true;
    });
    if (tabs) Array.prototype.forEach.call(tabs.querySelectorAll('.uni-tab'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-country') === state.country);
    });
    list.innerHTML = items.length
      ? items.map(card).join('')
      : '<p class="uni-empty">No universities match your filters right now. Try clearing a filter, or <a href="contact.html" class="link-inline">ask us directly</a>.</p>';
  }

  if (tabs) tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.uni-tab');
    if (!btn) return;
    state.country = btn.getAttribute('data-country');
    render();
  });
  if (openChk) openChk.addEventListener('change', function () { state.openOnly = openChk.checked; render(); });
  if (schChk) schChk.addEventListener('change', function () { state.schOnly = schChk.checked; render(); });

  // react if the hash changes on the same page (e.g. clicking a France/Italy link)
  window.addEventListener('hashchange', function () {
    var h = (location.hash || '').toLowerCase();
    if (h.indexOf('france') > -1) state.country = 'France';
    else if (h.indexOf('italy') > -1) state.country = 'Italy';
    else state.country = 'all';
    render();
  });

  render();
})();
