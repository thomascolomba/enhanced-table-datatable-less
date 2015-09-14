// A partir de la cha�ne de caract�res pass�es en argument du tag,
// On g�n�re un tableau avec les colonnes � trier ou non.
// 0: On trie   1 : on ne trie pas la colonne.
// La cha�ne de caract�res est de cette forme : "001" (on triera les 2 premi�res colonnes)

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
 * d�termine l'algorithme utilis� pour trier les donn�es selon le type et le format du champ
 * @return cl� dans $.fn.dataTable.ext.type.order qui contient la fonction utilis�e pour le tri en javascript (suivie de "-pre")
 */
function getAlgorithmePourTri(a_styleString){
    //console.log("getAlgorithmePourTri('"+a_styleString+"')");
    return "tri-"+a_styleString;
}

function initialiserLesIdDesBoutonsDeNavigationEntrePage(idPaginationTagImproved){
    var l_boutonNavigationPageList = $('[id=\"'+idPaginationTagImproved+'_paginate\"] a.paginate_button');
    for(var b_indexBoutonNavigationPageList = 0; b_indexBoutonNavigationPageList < l_boutonNavigationPageList.length; b_indexBoutonNavigationPageList++){
        if(b_indexBoutonNavigationPageList === 0) {//cas particulier du bouton 'Pr�c�dent'
            //on ne fait rien, on laisse l'id g�n�r� par datatable
        } else if(b_indexBoutonNavigationPageList === l_boutonNavigationPageList.length-1) {//cas particulier du bouton 'Suivant'
            //on ne fait rien, on laisse l'id g�n�r� par datatable
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

//Tri des donn�es num�riques
//on se contente de parser la valeur donn�e.
$.fn.dataTable.ext.type.order['tri-colonneEntier-pre'] = function (a_entierString) {
    //console.log(a_entierString);
    var l_resultat = parseInt(a_entierString);
    //console.log(l_resultat);
    return l_resultat;
};

//Tri lexicographique (des donn�es alphab�tiques, alphanum�riques...)
//Pas d'impl�mentation, datatable le fait pour nous