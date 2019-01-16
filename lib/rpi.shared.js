module.exports = {
  id: '',         // id device RPi
  frequency:1,   // delay in minutes between 2 dt's value refresh

  core: {         // info about core
    count: 0,       // core count
    model: '',      // core model
    serial: '',     // core serial
    revision: '',   // core revision
    frequency:'',   // core frequency
    voltage:'',     // core voltage
    temperature:''  // temperature CPU
  },

  system: {
    os:'',
    release:''
  },

  network:{
    hostname: '',
    ipExterne: '',
    ipLocal: ''
  },

  model: {          // RPi model
    date: '',         // release date
    model: '',        // model
    PCB_Revision: '', // revision
    memory: '',       // ram
    notes: '',        // comment
    full_name:''      // mode + revision
 },

 memory: {          // memory distribution between ...
  cpu:'',             // ... arm processor
  gpu:''              // ... graphic processor
 },

  revision: {                     // type of Rpi
    "900021": {
       date: "Q3 2016",
       model: "A+",
       PCB_Revision: "1.1",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "900032": {
       date: "Q2 2016?",
       model: "B+",
       PCB_Revision: "1.2",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "900092": {
       date: "Q4 2015",
       model: "Zero",
       PCB_Revision: "1.2",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "900093": {
       date: "Q2 2016",
       model: "Zero",
       PCB_Revision: "1.3",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "920093": {
       date: "Q4 2016?",
       model: "Zero",
       PCB_Revision: "1.3",
       memory: "512 MB",
       notes: "Mfg by Embest"
    },
    "Beta": {
       date: "Q1 2012",
       model: "B (Beta",
       PCB_Revision: "?",
       memory: "256 MB",
       notes: "Beta Board"
    },
    "0002": {
       date: "Q1 2012",
       model: "B",
       PCB_Revision: "1.0",
       memory: "256 MB",
       notes: ""
    },
    "0003": {
       date: "Q3 2012",
       model: "B (ECN0001",
       PCB_Revision: "1.0",
       memory: "256 MB",
       notes: "Fuses mod and D14 removed"
    },
    "0004": {
       date: "Q3 2012",
       model: "B",
       PCB_Revision: "2.0",
       memory: "256 MB",
       notes: "Mfg by Sony"
    },
    "0005": {
       date: "Q4 2012",
       model: "B",
       PCB_Revision: "2.0",
       memory: "256 MB",
       notes: "Mfg by Qisda"
    },
    "0006": {
       date: "Q4 2012",
       model: "B",
       PCB_Revision: "2.0",
       memory: "256 MB",
       notes: "Mfg by Egoman"
    },
    "0007": {
       date: "Q1 2013",
       model: "A",
       PCB_Revision: "2.0",
       memory: "256 MB",
       notes: "Mfg by Egoman"
    },
    "0008": {
       date: "Q1 2013",
       model: "A",
       PCB_Revision: "2.0",
       memory: "256 MB",
       notes: "Mfg by Sony"
    },
    "0009": {
       date: "Q1 2013",
       model: "A",
       PCB_Revision: "2.0",
       memory: "256 MB",
       notes: "Mfg by Qisda"
    },
    "000d": {
       date: "Q4 2012",
       model: "B",
       PCB_Revision: "2.0",
       memory: "512 MB",
       notes: "Mfg by Egoman"
    },
    "000e": {
       date: "Q4 2012",
       model: "B",
       PCB_Revision: "2.0",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "000f": {
       date: "Q4 2012",
       model: "B",
       PCB_Revision: "2.0",
       memory: "512 MB",
       notes: "Mfg by Qisda"
    },
    "0010": {
       date: "Q3 2014",
       model: "B+",
       PCB_Revision: "1.0",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "0011": {
       date: "Q2 2014",
       model: "Compute Module 1",
       PCB_Revision: "1.0",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "0012": {
       date: "Q4 2014",
       model: "A+",
       PCB_Revision: "1.1",
       memory: "256 MB",
       notes: "Mfg by Sony"
    },
    "0013": {
       date: "Q1 2015",
       model: "B+",
       PCB_Revision: "1.2",
       memory: "512 MB",
       notes: "Mfg by Embest"
    },
    "0014": {
       date: "Q2 2014",
       model: "Compute Module 1",
       PCB_Revision: "1.0",
       memory: "512 MB",
       notes: "Mfg by Embest"
    },
    "0015": {
       date: "?",
       model: "A+",
       PCB_Revision: "1.1",
       memory: "256 MB / 512 MB",
       notes: "Mfg by Embest"
    },
    "a01040": {
       date: "Unknown",
       model: "2 Model B",
       PCB_Revision: "1.0",
       memory: "1 GB",
       notes: "Mfg by Sony"
    },
    "a01041": {
       date: "Q1 2015",
       model: "2 Model B",
       PCB_Revision: "1.1",
       memory: "1 GB",
       notes: "Mfg by Sony"
    },
    "a21041": {
       date: "Q1 2015",
       model: "2 Model B",
       PCB_Revision: "1.1",
       memory: "1 GB",
       notes: "Mfg by Embest"
    },
    "a22042": {
       date: "Q3 2016",
       model: "2 Model B (with BCM2837",
       PCB_Revision: "1.2",
       memory: "1 GB",
       notes: "Mfg by Embest"
    },
    "9000c1": {
       date: "Q1 2017",
       model: "Zero W",
       PCB_Revision: "1.1",
       memory: "512 MB",
       notes: "Mfg by Sony"
    },
    "a02082": {
       date: "Q1 2016",
       model: "3 Model B",
       PCB_Revision: "1.2",
       memory: "1 GB",
       notes: "Mfg by Sony"
    },
    "a020a0": {
       date: "Q1 2017",
       model: "Compute Module 3 (and CM3 Lite",
       PCB_Revision: "1.0",
       memory: "1 GB",
       notes: "Mfg by Sony"
    },
    "a22082": {
       date: "Q1 2016",
       model: "3 Model B",
       PCB_Revision: "1.2",
       memory: "1 GB",
       notes: "Mfg by Embest"
    },
    "a32082": {
       date: "Q4 2016",
       model: "3 Model B",
       PCB_Revision: "1.2",
       memory: "1 GB",
       notes: "Mfg by Sony Japan"
    },
    "a020d3": {
       date: "Q1 2018",
       model: "3 Model B+",
       PCB_Revision: "1.3",
       memory: "1 GB",
       notes: "Mfg by Sony"
    },
    "9020e0": {
       date: "Q4 2018",
       model: "3 Model A+",
       PCB_Revision: "1.0",
       memory: "512 MB",
       notes: "Mfg by Sony"
    }
 }
}