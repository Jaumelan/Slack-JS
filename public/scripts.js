const username = prompt("What's your username");
const socket = io("http://localhost:9000", {
  query: {
    username,
  },
});
let nsSocket = "";

// listen for the nsList event. This will fire each time the page loads
socket.on("nsList", (nsData) => {
  //console.log("The list of namespaces has arrived!");
  //console.log(nsData);
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`;
  });

  // add a click listener for each NS
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      //console.log(`${nsEndpoint} I should go to now`);
      joinNs(nsEndpoint);
    });
  });

  joinNs("/wiki");
});
