# ecophyto
Pesticides - Projets de recherche


# Mode opératoire pour mettre à jour les données

* Exporter les données en CSV (veiller à ce que les textes soient protégés par des double-quotes).
* Vérifier s'il y a des colonnes ou lignes indésirables (vides). Dans ce cas les supprimer et sauvegarder de nouveau en CSV.
* Remplacer les noms des colonnes par la liste ci-dessous
* Vérifier que le fichier est au format UTF8 (avec NotePad++). Le convertir si besoin.
* Convertir le CSV en JSON (cf. outil csv2json)
* Remplacer tout le contenu du ecophyto.json par le résultat de la conversion (copier/coller)



## Liste des variables pour le CSV

"ID";"SIGLE";"TITRE";"RESUME";"PROGRAMME";"MOTSCLEFS";"ORGANISME";"PARTENAIRES";"ANNEE_DEBUT";"ANNEE_FIN";"ETAT";"FINANCEUR1";"FINANCEUR2";"APPEL";"SUBVENTION1";"SUBVENTION2";"COUTPROJET";"RESULTATS"


## Lien pour la transformation CSV -> JSON

http://www.csvjson.com/csv2json

