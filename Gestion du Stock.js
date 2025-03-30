
$("#bouton-valider").on("click",function(){
    let id=$("#champ-id").val();
    console.log(id)
    let nom=$("#champ-fruit").val();
    console.log(nom)
    let qt=$("#champ-quantite").val();
   
    addFruit({id:`${id}`,nom:`${nom}`,quantite:`${qt}`},qt);
       
    /*Interface et affichage Output*/

   //id element p 1
    $("#sortie-Nom").text(function() {
        return `Nom : ${nom}`;
    });

   //id element p 2
    $("#sortie-Qte").text(function() {
        return `quantité : ${qt}`;
    });

    //Vider le select
    const selectElement=document.getElementById("selecteur-fruit")
    selectElement.innerHTML=''

    //Récupérer la liste depuis le localStorage
    var storedNames = JSON.parse(localStorage.getItem('fruit'));

    // Vérifier si des données sont présentes dans le localStorage
    if (storedNames && storedNames.length > 0) {
      // Boucler sur chaque élément de la liste et l'ajouter à option
      storedNames.forEach(function(name) {
        var option = document.createElement("option");
        var x = document.getElementById("selecteur-fruit");
        option.text = `nom : ${name.nom}  quantité : ${name.quantite} `;
        x.appendChild(option);
      }); 
    };
 }); 

/*Attache evenement de changement à la selection qui récupère le texte de chaque option sélectionnée et les écrit dans span (id resultat-recherche).Il déclanche ensuite l'événement pour le texte initial*/
$( "select" ).on("change", function() {
    var str = "";
    $( "select option:selected" ).each( function() {
      str += $(this).text() + " ";
    } );
    $( "#resultat-recherche" ).text( str );
  } )
  .trigger( "change" );

$("#bouton-retrait").on("click",function(){
    let qt_rt=$("#champ-quantite-retrait").val();
    let id=$("#champ-id-retrait").val();
    console.log(id)
    retireStock({id:`${id}`},qt_rt)

    //Vider le select
    const selectElement=document.getElementById("selecteur-fruit")
    selectElement.innerHTML=''

    //Récupérer la liste depuis le localStorage
    var storedNames = JSON.parse(localStorage.getItem('fruit'));

    // Vérifier si des données sont présentes dans le localStorage
    if (storedNames && storedNames.length > 0) {
      // Boucler sur chaque élément de la liste et l'ajouter à option
      storedNames.forEach(function(name) {
        var option = document.createElement("option");
        var x = document.getElementById("selecteur-fruit");
        option.text = `nom : ${name.nom}  quantité : ${name.quantite} `;
        x.appendChild(option);
      }); 
    };
});

       
/*API de stockage web nous permet de stocker des données localement côté client.
taille maximale doit être inférieure ou égale à 5Mo
Les données ne sont ni transmises ni renvoyées au serveur à un moment donnée si vous utilisez API de stockage WEB.
Il sera toujours disponible localement dans un fichier. */

//Fonction saveFruit() sauvegarde sur la clé fruit.
function saveFruit(fruit){
    /*La sérialisation est une opération qui consiste à transformer une variable composite(objet,tableau) en une variable scalaire(chaine de caractère)
   En js, il est possible de sérialiser des objets au format JSON(Methode stringify) */
   /*La méthode setItem() de l'interface Storage permet de passe la clé(fruit)/valeur(enregistrement fruit),les ajoute a l'emplacement de stockage,
   et met à jour la valeur si la clé existe déja.le storage prend uniquement en charge le stockage et la récupération des chaines pour se faire je sérialise la variable composite a l'aide de JSON.stringify(). */
   localStorage.setItem("fruit",JSON.stringify(fruit));
 }

 /*Fonction getFruit() renvoie la valeur de cette clé fruit  */
 function getFruit(){
   /*La méthode getItem() avec la clé(fruit),renvoie la valeur de cette clé,ou si la clé n'existe pas,dans l'objet dnné renvoie null */
   let fruit=localStorage.getItem("fruit");
   if(fruit==null){
       //revoie un tableau vide
       return [];
   }else{
       /*JSON.parse() analyse une chaine de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaine.*/
       return JSON.parse(fruit);
   }
 }

 //focntion addFruit ajoute un fruit
 function addFruit(liste,qt){
   let fruit=getFruit();
   /*rechFruit par find qui renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passé en argument.Sinon,la valeur undefined est renvoyée. */
   let rechFruit=fruit.find(l=>l.id==liste.id)
   if(rechFruit!=undefined){
    rechFruit.quantite=Math.floor(rechFruit.quantite)+Math.floor(qt);
   }else{
       //ajouter fruit dans la clé fruit
       fruit.push(liste); 
   }
   /*savegarde sur la clé fruit*/
   saveFruit(fruit);
   //revoie la valeur de la clé fruit
   return localStorage.getItem("fruit")
 }

 function retireStock(liste,qt){
    let fruit=getFruit();
    let rechFruit=fruit.find(e=>e.id==liste.id);
    if(rechFruit!=undefined){
        rechFruit.quantite=Math.floor(rechFruit.quantite)-Math.floor(qt);
    }
    saveFruit(fruit);           
 }