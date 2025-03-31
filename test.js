


    // Au chargement de la page
    document.addEventListener("DOMContentLoaded", () => {
        const boutonAjouter = document.getElementById("bouton-valider");
        const boutonRetirer = document.getElementById("bouton-retrait");
        const boutonVider = document.getElementById("bouton-vider");
        const selecteurFruit = document.getElementById("selecteur-fruit");
        const resultatRecherche = document.getElementById("resultat-recherche");
        const sortieNom = document.getElementById("sortie-Nom");
        const sortieQuantite = document.getElementById("sortie-Qte");

        // Fonction pour récupérer le stock depuis localStorage
        const recupererStock = () => JSON.parse(localStorage.getItem("stock")) || {};

        // Fonction pour sauvegarder le stock dans localStorage
        const sauvegarderStock = (stock) => localStorage.setItem("stock", JSON.stringify(stock));

        // Fonction pour mettre à jour l'affichage du stock
        const mettreAJourAffichageStock = () => {
            const stock = recupererStock();
            selecteurFruit.innerHTML = '<option value="">Rechercher dans le stock ?</option>';
            for (const [fruit, quantite] of Object.entries(stock)) {
                const option = document.createElement("option");
                option.value = fruit;
                option.textContent = `${fruit} (${quantite})`;
                selecteurFruit.appendChild(option);
            }
        };

        // Ajouter un fruit au stock
        boutonAjouter.addEventListener("click", () => {
            // const id = document.getElementById("champ-id").value.trim();
            const fruit = document.getElementById("champ-fruit").value.trim();
            const quantite = parseInt(document.getElementById("champ-quantite").value.trim(), 10);

            if (fruit && quantite > 0) {
                const stock = recupererStock();
                stock[fruit] = (stock[fruit] || 0) + quantite;
                sauvegarderStock(stock);


                sortieNom.textContent = `Fruit : ${fruit}`;
                sortieQuantite.textContent = `Quantité : + ${quantite}`;
                resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]}`;

                mettreAJourAffichageStock();

                // Réinitialise les champs
                document.getElementById("champ-fruit").value = "";
                document.getElementById("champ-quantite").value = "";

                alert("Fruit ajouté au stock !");
            } else {
                alert("Veuillez remplir tous les champs correctement.");
            }
        });

        // Retirer un fruit du stock
        boutonRetirer.addEventListener("click", () => {
            // const id = document.getElementById("champ-id-retrait").value.trim();
            const fruit = document.getElementById("champ-fruit-retrait").value.trim();
            const quantite = parseInt(document.getElementById("champ-quantite-retrait").value.trim(), 10);

            if (fruit && quantite > 0) {
                const stock = recupererStock();
                if (stock[fruit] && stock[fruit] >= quantite) {
                    stock[fruit] -= quantite;
                    if (stock[fruit] === 0) delete stock[fruit];
                    sauvegarderStock(stock);

                    sortieNom.textContent = `Fruit : ${fruit} `;
                    // pour afficher l'icone meme si texContent change
                    const iconNom = document.createElement("i");
                    iconNom.className = "fa-solid fa-apple-whole";
                    sortieNom.appendChild(iconNom);
                    
                    sortieQuantite.textContent = `Quantité : -${quantite} `;
                    // pour afficher l'icone meme si texContent change
                    const iconQuantite = document.createElement("i");
                    iconQuantite.className = "fa-solid fa-basket-shopping";
                    sortieQuantite.appendChild(iconQuantite);
                    
                    resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]} `;
                    // pour afficher l'icone meme si texContent change
                    const iconStock = document.createElement("i");
                    iconStock.className = "fa-solid fa-warehouse";
                    resultatRecherche.appendChild(iconStock);
                    


                    // Réinitialise les champs
                    document.getElementById("champ-fruit-retrait").value = "";
                    document.getElementById("champ-quantite-retrait").value = "";

                    alert("Fruit retiré du stock !");
                    mettreAJourAffichageStock();
                } else {
                    alert("Quantité insuffisante ou fruit non trouvé.");
                }
            } else {
                alert("Veuillez remplir tous les champs correctement.");
            }
        });

        // btn vider le stock
        boutonVider.addEventListener("click", () => {
            if (confirm("Êtes-vous sûr de vouloir vider le stock ?")) {
                localStorage.removeItem("stock");
                mettreAJourAffichageStock();
                alert("Stock vidé !");
            }
        });

        // Afficher le résultat de la selection dans le selecteur
        selecteurFruit.addEventListener("change", () => {
            const fruit = selecteurFruit.value;
            const stock = recupererStock();
            if (fruit) {
                resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]}`;
                document.getElementById("champ-fruit").value = fruit;
                document.getElementById("champ-fruit-retrait").value = fruit;
                
                sortieNom.innerHTML = `<i class="fa-solid fa-apple-whole" ></i>`;
                sortieQuantite.innerHTML = `<i class="fa-solid fa-basket-shopping" ></i>`;

                // pour afficher l'icone meme si texContent change
                const iconStock = document.createElement("i");
                iconStock.className = "fa-solid fa-warehouse";
                resultatRecherche.appendChild(iconStock);
            } else {
                resultatRecherche.textContent = "";
                document.getElementById("champ-fruit").value = "";
                document.getElementById("champ-fruit-retrait").value = "";
                sortieNom.innerHTML = `<i class="fa-solid fa-apple-whole" ></i>`;
                sortieQuantite.innerHTML = `<i class="fa-solid fa-basket-shopping" ></i>`;
                resultatRecherche.innerHTML = `<i class="fa-solid fa-warehouse" ></i>`;
            }
        });

        // Initialiser l'affichage du stock
        mettreAJourAffichageStock();

        ////

    
        // const rec = Object.keys(recupererStock());

        // const result = rec.filter((e) => e.includes(`${inputValue}`));



        // let a = JSON.stringify(result);
        // let p = JSON.parse(a);
        // let select = document.getElementById("selecteur-fruit");
        // select.innerHTML = '';


    


        // p.forEach((function (el) {
        //     let suggestions = document.getElementById("suggestions");
        //     suggestions.innerHTML = '';
        //     suggestions.innerHTML += `<div>${el}</div>`;


        // })) 

        // console.log(p);
        // p.forEach((el) => function (el) {
            
                    
        //     const input = document.getElementById("recherche").value;

        //     const resultat = p.filter((el => el.toLocaleLowerCase()).includes(inputValue.toLocaleLowerCase())); 
            
        //     let suggestions = '';
    
        //     suggestions.innerHTML += 
        //     `<div> ${resultat}</div>`;
    
        //     document.getElementById("suggestions").innerHTML = suggestions;   
          
        // }); 

        


        suggestions.innerHTML = '';

        let input = document.getElementById("recherche");
    input.addEventListener('input', () => {

        
        inputValue = input.value;
        const rec = Object.keys(recupererStock());

        const result = rec.filter((e) => e.includes(`${inputValue}`));

        let a = JSON.stringify(result);
        let p = JSON.parse(a);
        // console.log(p);
        let t = [p];
        // console.log(t);
        u = [];
        t.forEach(function(z) { 
            u.push(z);
            
        });

        
let suggestions = document.getElementById("suggestion");
suggestions.innerHTML = '';
        
        u.forEach(function(z) {
            let index = 0;

            

        while (index < z.length) {
            
            let suggestions = document.getElementById("suggestion");
            p = document.createElement("p");
            p.id = "te"
            console.log(p.id)
            p.textContent = `${z[index]}`;
            let testID = suggestions.appendChild(p);
            console.log(testID);
            index++
            console.log(index);
        } 
        
        
        });

        
        
    });

    
        
});
    

    

