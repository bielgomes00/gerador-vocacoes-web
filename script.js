const form = document.getElementById("formulario");
const tipoDiv = document.getElementById("tipoDiv");
const saida = document.getElementById("saida");

// Mostrar/ocultar campo de tipo principal
document.getElementById("separar").addEventListener("change", (e) => {
  tipoDiv.style.display = e.target.value === "sim" ? "block" : "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idInicial = parseInt(document.getElementById("idInicial").value);
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const separar = document.getElementById("separar").value;
  const tipoPrincipal = separar === "sim" ? document.getElementById("tipo").value : "igual";
  const incluirTier = document.getElementById("incluirTier").value;

  let xmlFinal = "";

  for (let i = 0; i < quantidade; i++) {
    const id = idInicial + i;
    const tier = i + 1;
    const exp = (1.0 + i * 0.1).toFixed(1);

    let melee = "1.0";
    let dist = "1.0";

    if (tipoPrincipal === "melee") {
      melee = (20 + i * 2).toFixed(1);
    } else if (tipoPrincipal === "distance") {
      dist = (20 + i * 2).toFixed(1);
    } else {
      melee = dist = (20 + i * 2).toFixed(1);
    }

    const descricao = incluirTier === "sim" ? `${nome} [TIER ${tier}]` : nome;

    xmlFinal += `<vocation id="${id}" name="${nome}" description="${descricao}" needpremium="0" gaincap="100" gainhp="600" gainmana="600" gainhpticks="2" gainhpamount="100" gainmanaticks="2" gainmanaamount="100" manamultiplier="1.1" attackspeed="1100" soulmax="200" gainsoulticks="15" fromvoc="${id}" lessloss="8" manager="1">\n`;
    xmlFinal += `    <formula meleeDamage="${melee}" distDamage="${dist}" wandDamage="1.0" magDamage="${(2 + i * 0.5).toFixed(1)}" magHealingDamage="1.0" defense="1.0" magDefense="1.0" armor="1.0"/>\n`;
    xmlFinal += `    <skill fist="1.0" club="1.5" sword="1.5" axe="1.5" distance="1.5" shielding="1.5" fishing="1.0" experience="${exp}"/>\n`;
    xmlFinal += `</vocation>\n\n`;
  }

  saida.value = xmlFinal;
});

// Botão de baixar XML
document.getElementById("baixar").addEventListener("click", () => {
  const xml = saida.value;
  const blob = new Blob([xml], { type: "text/xml" });
  const link = document.createElement("a");

  const nomeArquivo = document.getElementById("nome").value.trim().toLowerCase() || "vocacoes";

  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}_vocations.xml`;
  link.click();
});
