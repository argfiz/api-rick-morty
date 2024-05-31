///////////////////////////////////PERSONAJES///////////////////////////////////////

const apiRick = async(pagina) => {
	
	
	
	let url ="https://rickandmortyapi.com/api/character/?page="+pagina ;
		console.log(url);
	const api = await fetch(url);
	const data = await api.json();
	console.log(data);
	
	const divRes=document.querySelector("#resultado");
	divRes.innerHTML=""	
    
	data.results.map(item=>{
		const divItem=document.createElement("div");
		divItem.innerHTML = `
		
				<div class = "card">

						<div class="nombre-pj">
							<h2>${item.name}</h2>
						</div>	

					<div class="nested-grid">
						
						<div id="img-av">
							<img src="${item.image}" alt="image">
						</div>
						<div class="info-card">
							
							<div class="info-font">	
								<p><b>Estado: </b><br>${item.status}</p>
								<p><b>Raza: </b><br>${item.species}</p>
								<p><b>Lugar: </b><br>${item.location.name}</p>
							</div>	

						</div>
					</div>
				</div>
			
			`
			divRes.appendChild(divItem);
		
	});
}


////////////////////////////////////////LOCACIONES///////////////////////////////////////

const apiRick2 = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/location?page=" + pagina;
    console.log(url);
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    
    const divRes = document.querySelector("#resultado");

    divRes.innerHTML = ``;

    // Iterar sobre cada ubicación
    data.results.forEach(async (location) => {
        const divItem = document.createElement("div");
        divItem.classList.add("card");

        const nestedGrid = document.createElement("div");
        nestedGrid.classList.add("nested-grid2");
             
        // Obtener los personajes que residen en esta ubicación
        for (const residentUrl of location.residents) {
            const residentResponse = await fetch(residentUrl);
            const residentData = await residentResponse.json();

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("avatar");

            const avatarImg = document.createElement("img");
            avatarImg.src = residentData.image;
            avatarImg.alt = residentData.name;

            avatarDiv.appendChild(avatarImg);
            nestedGrid.appendChild(avatarDiv);
        }
            
        // Mostrar la información de la ubicación
        divItem.innerHTML = `
            <div class="nombre-pj">
                <h2>${location.name}</h2>
            </div>
            <div class="info-card">
                <div class="info-font">
                    <p><b>Tipo: </b>${location.type}</p>
                    <p><b>Dimension: </b>${location.dimension}</p>
                </div>
            </div>
        `;

        divItem.appendChild(nestedGrid);
        divRes.appendChild(divItem);
    });
};


///////////////////////////////////////EPISODIOS///////////////////////////////////////

const apiRick3 = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/episode?page=" + pagina;
    console.log(url);
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);

    const divRes = document.querySelector("#resultado");

    divRes.innerHTML = ``;

    data.results.map(async (item) => {
        const divItem = document.createElement("div");
        divItem.classList.add("card");

        const nestedGrid = document.createElement("div");
        nestedGrid.classList.add("nested-grid2");

        // Obtener los personajes asociados al episodio
        const characterIds = item.characters.map((url) => url.split("/").pop());

        // Iterar sobre los personajes y mostrar sus avatares
        for (const characterId of characterIds) {
            const characterApi = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const characterData = await characterApi.json();

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("avatar");

            const avatarImg = document.createElement("img");
            avatarImg.src = characterData.image;
            avatarImg.alt = characterData.name;

            avatarDiv.appendChild(avatarImg);
            nestedGrid.appendChild(avatarDiv);
        }

        divItem.innerHTML = `
            <div class="nombre-pj">
                <h2>${item.name}</h2>
            </div>
            <div class="info-card">
                <div class="info-font">
                    <p><b>Capitulo N°: </b>${item.episode}</p>
                    <p><b>Estreno: </b>${item.air_date}</p>
                </div>
            </div>
        `;

        divItem.appendChild(nestedGrid);
        divRes.appendChild(divItem);
    });
};






	 
   