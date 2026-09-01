// ============================================================
// CONFIG
// ============================================================
const FLOW_URL = "https://default0b0b97150e42416aa08fd6a17ecfb6.de.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/29/workflows/798f125a94554eec8fd4c947193b3a18/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XymRzyPvfO6n6pWxYgoQac4BQ6wo9G_T6ncXiozX_1w";
const AVAILABILITY_URL = "https://default0b0b97150e42416aa08fd6a17ecfb6.de.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/00/workflows/b27a902d4d4b438680f987749505409d/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a-10v4p372MqxS9Fy3VsbO8p6zACOLhceR-GCI-EBQA"; // paste the AoW Calendar Availability flow URL here

const EVENT_START = "2026-09-01";
const EVENT_END   = "2026-09-03";
 
const VENUE_DURING = "Explorco Stand, Africa Oil Week";
const VENUE_AFTER  = "Explorco Office, Accra";
 
const BLOCKED_DATES = [
  // "2026-09-04",
];
const OPEN_DATES = [
  // "2026-09-02",
];
function isDateBookable(dateStr){
  if(OPEN_DATES.length > 0){ return OPEN_DATES.includes(dateStr); }
  return !BLOCKED_DATES.includes(dateStr);
}
 
const DEFAULT_SLOTS = [
  {time:"06:00", default:"available"},
  {time:"06:30", default:"available"},
  {time:"07:00", default:"available"},
  {time:"07:30", default:"available"},
  {time:"08:00", default:"available"},
  {time:"08:30", default:"available"},
  {time:"09:00", default:"available"},
  {time:"09:30", default:"available"},
  {time:"10:00", default:"available"},
  {time:"10:30", default:"available"},
  {time:"11:00", default:"available"},
  {time:"11:30", default:"available"},
  {time:"12:00", default:"available"},
  {time:"12:30", default:"available"},
  {time:"13:00", default:"available"},
  {time:"13:30", default:"available"},
  {time:"14:00", default:"available"},
  {time:"14:30", default:"available"},
  {time:"15:00", default:"available"},
  {time:"15:30", default:"available"},
  {time:"16:00", default:"available"},
  {time:"16:30", default:"available"},
  {time:"17:00", default:"available"},
  {time:"17:30", default:"available"},
  {time:"18:00", default:"available"},
  {time:"18:30", default:"available"},
  {time:"19:00", default:"available"},
  {time:"19:30", default:"available"},
  {time:"20:00", default:"available"},
  {time:"20:30", default:"available"},
  {time:"21:00", default:"available"},
  {time:"21:30", default:"available"},
  {time:"22:00", default:"available"}
];
const SLOT_OVERRIDES = {
  // "2026-09-02": { "08:30": "available" }
};
 
// ============================================================
// COUNTRY + PHONE CODE DATA
// One list drives both dropdowns so they always stay in sync.
// ============================================================
const COUNTRIES = [
  ["afghanistan","Afghanistan","+93"],["albania","Albania","+355"],["algeria","Algeria","+213"],
  ["andorra","Andorra","+376"],["angola","Angola","+244"],["antigua-and-barbuda","Antigua and Barbuda","+1268"],
  ["argentina","Argentina","+54"],["armenia","Armenia","+374"],["australia","Australia","+61"],
  ["austria","Austria","+43"],["azerbaijan","Azerbaijan","+994"],["bahamas","Bahamas","+1242"],
  ["bahrain","Bahrain","+973"],["bangladesh","Bangladesh","+880"],["barbados","Barbados","+1246"],
  ["belarus","Belarus","+375"],["belgium","Belgium","+32"],["belize","Belize","+501"],
  ["benin","Benin","+229"],["bhutan","Bhutan","+975"],["bolivia","Bolivia","+591"],
  ["bosnia-and-herzegovina","Bosnia and Herzegovina","+387"],["botswana","Botswana","+267"],["brazil","Brazil","+55"],
  ["brunei","Brunei","+673"],["bulgaria","Bulgaria","+359"],["burkina-faso","Burkina Faso","+226"],
  ["burundi","Burundi","+257"],["cabo-verde","Cabo Verde","+238"],["cambodia","Cambodia","+855"],
  ["cameroon","Cameroon","+237"],["canada","Canada","+1"],["central-african-republic","Central African Republic","+236"],
  ["chad","Chad","+235"],["chile","Chile","+56"],["china","China","+86"],
  ["colombia","Colombia","+57"],["comoros","Comoros","+269"],["congo-brazzaville","Congo (Congo-Brazzaville)","+242"],
  ["costa-rica","Costa Rica","+506"],["croatia","Croatia","+385"],["cuba","Cuba","+53"],
  ["cyprus","Cyprus","+357"],["czechia","Czechia (Czech Republic)","+420"],["democratic-republic-of-the-congo","Democratic Republic of the Congo","+243"],
  ["denmark","Denmark","+45"],["djibouti","Djibouti","+253"],["dominica","Dominica","+1767"],
  ["dominican-republic","Dominican Republic","+1809"],["ecuador","Ecuador","+593"],["egypt","Egypt","+20"],
  ["el-salvador","El Salvador","+503"],["equatorial-guinea","Equatorial Guinea","+240"],["eritrea","Eritrea","+291"],
  ["estonia","Estonia","+372"],["eswatini","Eswatini","+268"],["ethiopia","Ethiopia","+251"],
  ["fiji","Fiji","+679"],["finland","Finland","+358"],["france","France","+33"],
  ["gabon","Gabon","+241"],["gambia","Gambia","+220"],["georgia","Georgia","+995"],
  ["germany","Germany","+49"],["ghana","Ghana","+233"],["greece","Greece","+30"],
  ["grenada","Grenada","+1473"],["guatemala","Guatemala","+502"],["guinea","Guinea","+224"],
  ["guinea-bissau","Guinea-Bissau","+245"],["guyana","Guyana","+592"],["haiti","Haiti","+509"],
  ["honduras","Honduras","+504"],["hungary","Hungary","+36"],["iceland","Iceland","+354"],
  ["india","India","+91"],["indonesia","Indonesia","+62"],["iran","Iran","+98"],
  ["iraq","Iraq","+964"],["ireland","Ireland","+353"],["israel","Israel","+972"],
  ["italy","Italy","+39"],["jamaica","Jamaica","+1876"],["japan","Japan","+81"],
  ["jordan","Jordan","+962"],["kazakhstan","Kazakhstan","+7"],["kenya","Kenya","+254"],
  ["kiribati","Kiribati","+686"],["kuwait","Kuwait","+965"],["kyrgyzstan","Kyrgyzstan","+996"],
  ["laos","Laos","+856"],["latvia","Latvia","+371"],["lebanon","Lebanon","+961"],
  ["lesotho","Lesotho","+266"],["liberia","Liberia","+231"],["libya","Libya","+218"],
  ["liechtenstein","Liechtenstein","+423"],["lithuania","Lithuania","+370"],["luxembourg","Luxembourg","+352"],
  ["madagascar","Madagascar","+261"],["malawi","Malawi","+265"],["malaysia","Malaysia","+60"],
  ["maldives","Maldives","+960"],["mali","Mali","+223"],["malta","Malta","+356"],
  ["marshall-islands","Marshall Islands","+692"],["mauritania","Mauritania","+222"],["mauritius","Mauritius","+230"],
  ["mexico","Mexico","+52"],["micronesia","Micronesia","+691"],["moldova","Moldova","+373"],
  ["monaco","Monaco","+377"],["mongolia","Mongolia","+976"],["montenegro","Montenegro","+382"],
  ["morocco","Morocco","+212"],["mozambique","Mozambique","+258"],["myanmar","Myanmar","+95"],
  ["namibia","Namibia","+264"],["nauru","Nauru","+674"],["nepal","Nepal","+977"],
  ["netherlands","Netherlands","+31"],["new-zealand","New Zealand","+64"],["nicaragua","Nicaragua","+505"],
  ["niger","Niger","+227"],["nigeria","Nigeria","+234"],["north-korea","North Korea","+850"],
  ["north-macedonia","North Macedonia","+389"],["norway","Norway","+47"],["oman","Oman","+968"],
  ["pakistan","Pakistan","+92"],["palau","Palau","+680"],["palestine","Palestine","+970"],
  ["panama","Panama","+507"],["papua-new-guinea","Papua New Guinea","+675"],["paraguay","Paraguay","+595"],
  ["peru","Peru","+51"],["philippines","Philippines","+63"],["poland","Poland","+48"],
  ["portugal","Portugal","+351"],["qatar","Qatar","+974"],["romania","Romania","+40"],
  ["russia","Russia","+7"],["rwanda","Rwanda","+250"],["saint-kitts-and-nevis","Saint Kitts and Nevis","+1869"],
  ["saint-lucia","Saint Lucia","+1758"],["saint-vincent-and-the-grenadines","Saint Vincent and the Grenadines","+1784"],["samoa","Samoa","+685"],
  ["san-marino","San Marino","+378"],["sao-tome-and-principe","Sao Tome and Principe","+239"],["saudi-arabia","Saudi Arabia","+966"],
  ["senegal","Senegal","+221"],["serbia","Serbia","+381"],["seychelles","Seychelles","+248"],
  ["sierra-leone","Sierra Leone","+232"],["singapore","Singapore","+65"],["slovakia","Slovakia","+421"],
  ["slovenia","Slovenia","+386"],["solomon-islands","Solomon Islands","+677"],["somalia","Somalia","+252"],
  ["south-africa","South Africa","+27"],["south-korea","South Korea","+82"],["south-sudan","South Sudan","+211"],
  ["spain","Spain","+34"],["sri-lanka","Sri Lanka","+94"],["sudan","Sudan","+249"],
  ["suriname","Suriname","+597"],["sweden","Sweden","+46"],["switzerland","Switzerland","+41"],
  ["syria","Syria","+963"],["tajikistan","Tajikistan","+992"],["tanzania","Tanzania","+255"],
  ["thailand","Thailand","+66"],["timor-leste","Timor-Leste","+670"],["togo","Togo","+228"],
  ["tonga","Tonga","+676"],["trinidad-and-tobago","Trinidad and Tobago","+1868"],["tunisia","Tunisia","+216"],
  ["turkey","Turkey","+90"],["turkmenistan","Turkmenistan","+993"],["tuvalu","Tuvalu","+688"],
  ["uganda","Uganda","+256"],["ukraine","Ukraine","+380"],["united-arab-emirates","United Arab Emirates","+971"],
  ["united-kingdom","United Kingdom","+44"],["united-states","United States","+1"],["uruguay","Uruguay","+598"],
  ["uzbekistan","Uzbekistan","+998"],["vanuatu","Vanuatu","+678"],["vatican-city","Vatican City","+39"],
  ["venezuela","Venezuela","+58"],["vietnam","Vietnam","+84"],["yemen","Yemen","+967"],
  ["zambia","Zambia","+260"],["zimbabwe","Zimbabwe","+263"]
];
 
function populateCountryDropdowns(){
  const countrySel = document.getElementById('country');
  const codeSel = document.getElementById('phoneCode');
 
  COUNTRIES.forEach(([value, name, code])=>{
    const o1 = document.createElement('option');
    o1.value = value; o1.textContent = name;
    countrySel.appendChild(o1);
 
    const o2 = document.createElement('option');
    o2.value = value; o2.textContent = `${code}  ${name}`;
    codeSel.appendChild(o2);
  });
 
  countrySel.addEventListener('change', ()=>{
    if(countrySel.value){ codeSel.value = countrySel.value; }
    updateNav();
  });
  codeSel.addEventListener('change', ()=>{
    if(codeSel.value){ countrySel.value = codeSel.value; }
    updateNav();
  });
}
 
function getSelectedCallingCode(){
  const codeSel = document.getElementById('phoneCode');
  const match = COUNTRIES.find(c => c[0] === codeSel.value);
  return match ? match[2] : '';
}
 
// ============================================================
const state = { step:1, category:null, date:null, slot:null };
 
function isDuringEvent(dateStr){ return dateStr >= EVENT_START && dateStr <= EVENT_END; }
function venueFor(dateStr){ return isDuringEvent(dateStr) ? VENUE_DURING : VENUE_AFTER; }
 
function isPastTimeToday(dateStr, timeStr){
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  if(dateStr !== todayStr) return false;
  const [h, m] = timeStr.split(':').map(Number);
  const slotTime = new Date();
  slotTime.setHours(h, m, 0, 0);
  return slotTime <= now;
}
 
function buildSlotsForDate(dateStr){
  const overridesForDate = SLOT_OVERRIDES[dateStr] || {};
  return DEFAULT_SLOTS.map(s => ({ time: s.time, status: overridesForDate[s.time] || s.default }));
}
 
function renderProgress(){
  const el = document.getElementById('progress');
  const labels = ['Enquiry','Details','Time'];
  el.innerHTML = labels.map((l,i)=>{
    const n = i+1;
    const filled = state.step > n ? 100 : (state.step === n ? 55 : 0);
    return `<div class="seg ${state.step===n?'active':''}">
      <div class="label">0${n} - ${l}</div>
      <div class="bar"><i style="width:${filled}%"></i></div>
    </div>`;
  }).join('');
}
 
function renderVenueNote(dateStr){
  const el = document.getElementById('venueNote');
  if(!dateStr){ el.innerHTML = ''; return; }
  el.innerHTML = `<div class="note">Location for this date: <strong>${venueFor(dateStr)}</strong></div>`;
}
 
async function renderSlots(){
  const el = document.getElementById('slotGrid');
  if(!state.date){ el.innerHTML = ''; return; }
 
  if(!isDateBookable(state.date)){
    el.innerHTML = `<div class="note">This date isn't available for booking. Please choose another day.</div>`;
    return;
  }
 
  el.innerHTML = `<div class="note">Checking availability...</div>`;
 
  let liveTaken = [];
  if(AVAILABILITY_URL){
    try{
      const res = await fetch(AVAILABILITY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: state.date })
      });
      const data = await res.json();
      liveTaken = data.taken || [];
    } catch(err){
      console.error("Availability check failed:", err);
    }
  }
 
  const slots = buildSlotsForDate(state.date);
  el.innerHTML = slots.map(s=>{
    const takenLive = liveTaken.includes(s.time);
    const past = isPastTimeToday(state.date, s.time);
    const bookable = s.status === 'available' && !takenLive && !past;
    const isSel = state.slot === s.time;
    const cls = bookable ? (isSel ? 'selected' : '') : 'taken';
    return `<div class="slot ${cls}" ${bookable ? `onclick="selectSlot('${s.time}')"` : ''}>${s.time}</div>`;
  }).join('');
}
function selectSlot(t){ state.slot = t; renderSlots(); updateNav(); }
 
function selectCategory(cat){
  state.category = cat;
  document.querySelectorAll('.cat-card').forEach(c=>c.classList.toggle('selected', c.dataset.cat===cat));
  updateNav();
}
 
function showStep(n){
  document.querySelectorAll('.step').forEach(s=> s.classList.toggle('active', +s.dataset.step === n));
  document.getElementById('backBtn').style.display = n>1 && n<4 ? 'block' : 'none';
  renderProgress();
  updateNav();
  window.scrollTo({top:0,behavior:'smooth'});
}
 
function updateNav(){
  const btn = document.getElementById('nextBtn');
  const nav = document.getElementById('nav');
  if(state.step===1){
    btn.disabled = !state.category;
    btn.textContent = state.category ? 'Continue' : 'Choose an option to continue';
    btn.className = 'btn btn-primary';
    nav.style.display='flex';
  } else if(state.step===2){
    const emailValid = isValidEmail(val('email'));
    const phoneValid = isValidPhoneNumber(val('phoneNumber'));
    const ok = val('fullName') && val('company') && val('title') && emailValid
      && document.getElementById('phoneCode').value && phoneValid
      && document.getElementById('country').value;
    btn.disabled = !ok;
    btn.textContent = 'Continue to date and time';
    btn.className = 'btn btn-primary';
    nav.style.display='flex';
  } else if(state.step===3){
    btn.disabled = !(state.date && state.slot);
    btn.textContent = 'Confirm appointment';
    btn.className = 'btn btn-gold';
    nav.style.display='flex';
  } else {
    nav.style.display='none';
  }
}
function val(id){ return document.getElementById(id).value.trim(); }
 
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhoneNumber(num){
  const digitsOnly = num.replace(/\D/g,'');
  return digitsOnly.length >= 6 && digitsOnly.length <= 12;
}
function toggleFieldError(inputId, errorId, isValid){
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  const hasContent = input.value.trim().length > 0;
  const show = hasContent && !isValid;
  error.classList.toggle('show', show);
  input.classList.toggle('invalid', show);
}
 
['fullName','company','title','email','phoneNumber'].forEach(id=>{
  document.addEventListener('input', e=>{ if(e.target.id===id) updateNav(); });
});
 
document.getElementById('email').addEventListener('input', ()=>{
  if(isValidEmail(val('email'))){ toggleFieldError('email','emailError', true); }
});
document.getElementById('phoneNumber').addEventListener('input', ()=>{
  if(isValidPhoneNumber(val('phoneNumber'))){ toggleFieldError('phoneNumber','phoneError', true); }
});
document.getElementById('email').addEventListener('blur', ()=>{
  toggleFieldError('email','emailError', isValidEmail(val('email')));
});
document.getElementById('phoneNumber').addEventListener('blur', ()=>{
  toggleFieldError('phoneNumber','phoneError', isValidPhoneNumber(val('phoneNumber')));
});
 
document.addEventListener('DOMContentLoaded', ()=>{
  populateCountryDropdowns();
 
  const dateInput = document.getElementById('apptDate');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.addEventListener('change', ()=>{
    state.date = dateInput.value;
    state.slot = null;
    renderVenueNote(state.date);
    renderSlots();
    updateNav();
  });
});
 
function goBack(){ if(state.step>1){ state.step--; showStep(state.step); } }
 
function goNext(){
  if(state.step===1 && state.category){ state.step=2; showStep(2); }
  else if(state.step===2){ state.step=3; showStep(3); }
  else if(state.step===3 && state.date && state.slot){ finalize(); state.step=4; showStep(4); }
}
 
function generateReference(prefix){
  const d = new Date();
  const datePart = `${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  const rand = Math.random().toString(36).substring(2,6).toUpperCase();
  return `AOW-${prefix}-${datePart}-${rand}`;
}
 
function finalize(){
  const prefix = state.category==='farmin' ? 'FI' : 'VN';
  const ref = generateReference(prefix);
  const catLabel = state.category==='farmin' ? 'Farm-in Opportunities & Data Enquiries' : 'Vendor Enquiries';
  const team = "MD's Secretary";
  const venue = venueFor(state.date);
 
  document.getElementById('cRef').textContent = ref;
  document.getElementById('cCat').textContent = catLabel;
  document.getElementById('cName').textContent = val('fullName');
  document.getElementById('cCompany').textContent = val('company');
  document.getElementById('cSlot').textContent = `${state.date} - ${state.slot}`;
  document.getElementById('cVenue').textContent = venue;
 
  submitToFlow(ref, catLabel, team, venue);
}
 
async function submitToFlow(ref, catLabel, team, venue){
  const statusEl = document.getElementById('submitStatus');
  const fullPhone = `${getSelectedCallingCode()} ${val('phoneNumber')}`;
 
  const payload = {
    reference: ref,
    category: state.category,
    categoryLabel: catLabel,
    routedTo: team,
    venue: venue,
    fullName: val('fullName'),
    company: val('company'),
    jobTitle: val('title'),
    email: val('email'),
    phone: fullPhone,
    country: document.getElementById('country').value,
    apptDate: state.date,
    timeSlot: state.slot,
    notes: val('notes')
  };
 
  if(!FLOW_URL){
    statusEl.textContent = "Demo mode: not connected to Power Automate yet.";
    return;
  }
 
  statusEl.textContent = "Saving your appointment...";
  try{
    const res = await fetch(FLOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if(res.ok){
      statusEl.textContent = "Booking submitted. We'll email you once it's confirmed.";
      showSuccessModal();
    } else {
      statusEl.textContent = "Something went wrong saving this. Please note the reference above and let a team member know.";
      statusEl.classList.add('error');
    }
  } catch(err){
    statusEl.textContent = "Could not reach the booking system. Please note the reference above and let a team member know.";
    statusEl.classList.add('error');
  }
}
 
function showSuccessModal(){
  document.getElementById('successModal').classList.add('active');
}
 
function closeSuccessModal(){
  document.getElementById('successModal').classList.remove('active');
  resetToHome();
}
 
function resetToHome(){
  ['fullName','company','title','email','phoneNumber','notes'].forEach(id=>{
    document.getElementById(id).value = '';
  });
  document.getElementById('phoneCode').value = '';
  document.getElementById('country').value = '';
  document.getElementById('apptDate').value = '';
 
  state.step = 1; state.category = null; state.date = null; state.slot = null;
 
  document.querySelectorAll('.cat-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById('venueNote').innerHTML = '';
  document.getElementById('slotGrid').innerHTML = '';
 
  const statusEl = document.getElementById('submitStatus');
  statusEl.textContent = '';
  statusEl.classList.remove('error');
 
  showStep(1);
}
 
renderProgress();
updateNav();