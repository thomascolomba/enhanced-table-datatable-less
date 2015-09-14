// A partir de la chaîne de caractères passées en argument du tag,
// On génère un tableau avec les colonnes à trier ou non.
// 0: On trie   1 : on ne trie pas la colonne.
// La chaîne de caractères est de cette forme : "001" (on triera les 2 premières colonnes)

function creerAocColumns(chaine){
    var tableauColonnesTriables = new Array();
    if(chaine.length>0){
        for ( var int = 0; int < chaine.length; int++) {
            if(chaine.charAt(int) == '0'){
                // Colonnes triables
                tableauColonnesTriables[int] = null ;
            }
            else{
                // Colonnes non triables
                tableauColonnesTriables[int] = { "bSortable": false };
            }
        }
    }
    return tableauColonnesTriables;
}

/**
 * détermine l'algorithme utilisé pour trier les données selon le type et le format du champ
 * @return clé dans $.fn.dataTable.ext.type.order qui contient la fonction utilisée pour le tri en javascript (suivie de "-pre")
 */
function getAlgorithmePourTri(a_styleString){
    //console.log("getAlgorithmePourTri('"+a_styleString+"')");
    return "tri-"+a_styleString;
}

function initialiserLesIdDesBoutonsDeNavigationEntrePage(idPaginationTagImproved){
    var l_boutonNavigationPageList = $('[id=\"'+idPaginationTagImproved+'_paginate\"] a.paginate_button');
    for(var b_indexBoutonNavigationPageList = 0; b_indexBoutonNavigationPageList < l_boutonNavigationPageList.length; b_indexBoutonNavigationPageList++){
        if(b_indexBoutonNavigationPageList === 0) {//cas particulier du bouton 'Précédent'
            //on ne fait rien, on laisse l'id généré par datatable
        } else if(b_indexBoutonNavigationPageList === l_boutonNavigationPageList.length-1) {//cas particulier du bouton 'Suivant'
            //on ne fait rien, on laisse l'id généré par datatable
        } else {
            l_boutonNavigationPageList.eq(b_indexBoutonNavigationPageList).attr('id', idPaginationTagImproved+'_boutonNavigationPage_'+b_indexBoutonNavigationPageList);
        }
    }
}


//Tri des dates selon le format jour/mois/annee (jj/mm/aaaa)
//on se contente de retourner AAAAMMJJ.
$.fn.dataTable.ext.type.order['tri-date_jjmmaa-pre'] = function (a_dateString) {
    //console.log(a_dateString);
    var l_annee = new String(a_dateString.substr(6, 4));
    var l_mois = new String(a_dateString.substr(3, 2));
    var l_jour = new String(a_dateString.substr(0,2));
    var l_resultat = parseInt(l_annee.concat(l_mois, l_jour));
    //console.log(l_resultat);
    return l_resultat;
};

//Tri des données numériques
//on se contente de parser la valeur donnée.
$.fn.dataTable.ext.type.order['tri-colonneEntier-pre'] = function (a_entierString) {
    //console.log(a_entierString);
    var l_resultat = parseInt(a_entierString);
    //console.log(l_resultat);
    return l_resultat;
};

//Tri lexicographique (des données alphabétiques, alphanumériques...)
//Pas d'implémentation, datatable le fait pour nous