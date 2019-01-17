var translationsEN = {
  MATERIEL: "Equipment",
  REFRESH: "Refresh",
  MODEL_RASPBERRY: "Raspberry Model",
  TYPE_RASPBERRY: "Model",
  MARKETING_DATE: "Release date",
  TOTAL_MEMORY: "Total memory",
  CPU_MEMORY: "dedicated CPU",
  GPU_MEMORY: "dedicated GPU",
  COMMENT: "Comment",
  PROCESSOR: "Processor",
  MODEL_PROCESSOR: "Model",
  CORE_NUMBER: "Number of cores",
  FREQUENCY_PROCESSOR: "Operating frequency",
  VOLTAGE_PROCESSOR: "Operating voltage",
  TEMPERATURE: "Temperature",
  TEMPERATURE_CPU: "CPU",
  TEMPERATURE_GPU: "GPU",
  SERIAL_PROCESSOR: "Serial number",
  REVISION_PROCESSOR: "Revision number",
  SYSTEME: "Software",
  OS: "Operating system",
  TYPE_OS: "Type",
  RELEASE_OS: "Release",
  NETWORK: "Network",
  HOSTNAME: "Hostname",
  LOCAL_IP: "Local IP address",
  EXTERNAL_IP: "Public IP address",
  ERROR: "Some data could not be recovered. Check Gladys' logs."
};

var translationsFR = {
  MATERIEL: "Matériel",
  REFRESH: "Actualiser",
  MODEL_RASPBERRY: "Modèle de Raspberry",
  TYPE_RASPBERRY: "Type",
  MARKETING_DATE: "Date de sortie",
  TOTAL_MEMORY: "Mémoire totale",
  CPU_MEMORY: "dédiée CPU",
  GPU_MEMORY: "dédiée GPU",
  COMMENT: "Commentaire",
  PROCESSOR: "Processeur",
  MODEL_PROCESSOR: "Modèle",
  CORE_NUMBER: "Nombre de coeur",
  FREQUENCY_PROCESSOR: "Fréquence de fonctionnement",
  VOLTAGE_PROCESSOR: "Tension de fonctionnement",
  TEMPERATURE: "Température",
  TEMPERATURE_CPU: "CPU",
  TEMPERATURE_GPU: "GPU",
  SERIAL_PROCESSOR: "N° de série",
  REVISION_PROCESSOR: "N° de révision",
  SYSTEME: "Logiciel",
  OS: "Système d'exploitation",
  TYPE_OS: "Type",
  RELEASE_OS: "Version",
  NETWORK: "Réseaux",
  HOSTNAME: "Nom d'hôte",
  LOCAL_IP: "Adresse IP locale",
  EXTERNAL_IP: "Adresse IP public",
  ERROR: "Certaines données n'ont pu être récupéré. Consultez les logs de Gladys."
};

angular
  .module('gladys')
  .config(['$translateProvider', function($translateProvider) {
    // add translation table
    $translateProvider
      .translations('en', translationsEN)
      .translations('fr', translationsFR);
  }]);