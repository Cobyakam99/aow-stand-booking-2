// ============================================================
// CONFIG: paste your working Power Automate booking flow URL here.
// ============================================================
const FLOW_URL = "https://default0b0b97150e42416aa08fd6a17ecfb6.de.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/29/workflows/798f125a94554eec8fd4c947193b3a18/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XymRzyPvfO6n6pWxYgoQac4BQ6wo9G_T6ncXiozX_1w"; // paste your Power Automate HTTP trigger URL here later
const AVAILABILITY_URL = "https://default0b0b97150e42416aa08fd6a17ecfb6.de.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/00/workflows/b27a902d4d4b438680f987749505409d/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a-10v4p372MqxS9Fy3VsbO8p6zACOLhceR-GCI-EBQA";


const EVENT_START = "2026-09-01";
const EVENT_END   = "2026-09-03";
 
const VENUE_DURING = "Explorco Stand, Africa Oil Week";
const VENUE_AFTER  = "Explorco Office, Accra";
 
// ============================================================
// MANUAL AVAILABILITY CONTROL
// Everything below this line, you edit yourself. Save, commit,
// push, and it's live within about a minute.
// ============================================================
 
// OPTION A: block specific days, leave everything else open.
// Add dates here (YYYY-MM-DD) to close just those days.
const BLOCKED_DATES = [
  // "2026-09-04",
];
 
// OPTION B: close everything except a specific set of days.
// If you put ANY dates in here, ONLY those dates become
// bookable, every other date is closed automatically,
// BLOCKED_DATES is ignored while this has entries.
// Leave this empty ([]) to go back to Option A behaviour.
const OPEN_DATES = [
  // "2026-09-02",
];
 
function isDateBookable(dateStr){
  if(OPEN_DATES.length > 0){
    return OPEN_DATES.includes(dateStr);
  }
  return !BLOCKED_DATES.includes(dateStr);
}
 
// The fixed grid of half-hour slots, 8am to 4:30pm, each with
// its default status.
const DEFAULT_SLOTS = [
  {time:"08:00", default:"available"},
  {time:"08:30", default:"unavailable"},
  {time:"09:00", default:"unavailable"},
  {time:"09:30", default:"unavailable"},
  {time:"10:00", default:"available"},
  {time:"10:30", default:"unavailable"},
  {time:"11:00", default:"unavailable"},
  {time:"11:30", default:"unavailable"},
  {time:"12:00", default:"available"},
  {time:"12:30", default:"unavailable"},
  {time:"13:00", default:"unavailable"},
  {time:"13:30", default:"unavailable"},
  {time:"14:00", default:"available"},
  {time:"14:30", default:"unavailable"},
  {time:"15:00", default:"unavailable"},
  {time:"15:30", default:"unavailable"},
  {time:"16:00", default:"available"},
  {time:"16:30", default:"unavailable"}
];
 
// Per-date, per-time overrides. Turn a normally-closed slot on,
// turn a normally-open slot off, or mark one taken once you
// notice a booking in SharePoint.
// Example:
// "2026-09-02": { "08:30": "available", "10:00": "unavailable" }
const SLOT_OVERRIDES = {
  // "2026-09-02": { "08:30": "available" }
};
 
const state = { step:1, category:null, date:null, slot:null };
 
function isDuringEvent(dateStr){
  return dateStr >= EVENT_START && dateStr <= EVENT_END;
}
function venueFor(dateStr){
  return isDuringEvent(dateStr) ? VENUE_DURING : VENUE_AFTER;
}
 
function buildSlotsForDate(dateStr){
  const overridesForDate = SLOT_OVERRIDES[dateStr] || {};
  return DEFAULT_SLOTS.map(s => {
    const status = overridesForDate[s.time] || s.default;
    return { time: s.time, status };
  });
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
      console.log("Availability check response:", JSON.stringify(data));
      liveTaken = data.taken || [];
    } catch(err){
      console.error("Availability check failed:", err);
    }
  } else {
    console.warn("AVAILABILITY_URL is empty, skipping live availability check.");
  }
 
  const slots = buildSlotsForDate(state.date);
  el.innerHTML = slots.map(s=>{
    const takenLive = liveTaken.includes(s.time);
    const bookable = s.status === 'available' && !takenLive;
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
    const ok = val('fullName') && val('company') && val('email');
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
 
['fullName','company','email','phone','title','country'].forEach(id=>{
  document.addEventListener('input', e=>{ if(e.target.id===id) updateNav(); });
});
 
document.addEventListener('DOMContentLoaded', ()=>{
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
 
// Generates a unique reference every time, no shared counter,
// so two visitors on two different phones never collide.
// Format: AOW-FI-0902-K3F7 (category-date-random)
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
  document.getElementById('cTeam').textContent = team;
 
  submitToFlow(ref, catLabel, team, venue);
}
 
async function submitToFlow(ref, catLabel, team, venue){
  const statusEl = document.getElementById('submitStatus');
 
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
    phone: val('phone'),
    country: val('country'),
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
  // clear all typed fields
  ['fullName','company','title','email','phone','country','notes'].forEach(id=>{
    document.getElementById(id).value = '';
  });
  document.getElementById('apptDate').value = '';
 
  // clear state
  state.step = 1;
  state.category = null;
  state.date = null;
  state.slot = null;
 
  // clear category card selection
  document.querySelectorAll('.cat-card').forEach(c=>c.classList.remove('selected'));
 
  // clear venue note and slot grid
  document.getElementById('venueNote').innerHTML = '';
  document.getElementById('slotGrid').innerHTML = '';
 
  // clear submit status text for next time
  const statusEl = document.getElementById('submitStatus');
  statusEl.textContent = '';
  statusEl.classList.remove('error');
 
  showStep(1);
}
 
renderProgress();
updateNav();