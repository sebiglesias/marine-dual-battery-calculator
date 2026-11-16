
const MARINE_LOADS = {
  loadMfd: 2.5,
  loadStereo: 5.0,
  loadVhf: 0.5,
  loadLivewell: 3.5,
  loadLights: 3.0,
  loadFridge: 4.0
};

function init() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', calc);
  });
  document.getElementById('engineHp').addEventListener('change', calc);
  document.getElementById('tripHours').addEventListener('input', calc);
  calc();
}

function calc() {
  const mca = document.getElementById('engineHp').value;
  const hrs = parseFloat(document.getElementById('tripHours').value)||5;

  let amps = 0;
  for (const [id, a] of Object.entries(MARINE_LOADS)) {
    const el = document.getElementById(id);
    if (el && el.checked) amps += a;
  }

  const usedAh = amps * hrs;
  // Size house battery to 50% max DoD for lead/AGM, or 80% for LiFePO4. Plan 2x usedAh for safe reserve
  const recAh = Math.max(50, Math.ceil((usedAh * 2) / 5) * 5);

  document.getElementById('houseAh').textContent = `${recAh} Ah`;
  document.getElementById('ccaSummary').textContent = `Starting Battery: ${mca}+ Marine Cranking Amps (MCA)`;
  document.getElementById('totalAmps').textContent = `${amps.toFixed(1)} Amps`;
  document.getElementById('usedAh').textContent = `${usedAh.toFixed(1)} Ah`;
}
window.addEventListener('DOMContentLoaded', init);
