module.exports = {
  // Update id Module of Alexa_devices Param
  updateIdParamRpiInfo: `UPDATE param SET module = ? WHERE name="Info_RPi_Refresh_Time"`,

  deleteBox: `DELETE FROM box WHERE box.boxtype = 
    (SELECT id FROM boxtype WHERE uuid ='9d3cdce8-2603-4d64-b9de-969ba2261a21');`,

  rpiBox: `SELECT id, params FROM box WHERE box.boxtype = 
    (SELECT id FROM boxtype WHERE uuid ='9d3cdce8-2603-4d64-b9de-969ba2261a21');`,

  // Pass a filter criteria
  getBoxTypeId: `SELECT id
    FROM boxtype
    WHERE uuid = '9d3cdce8-2603-4d64-b9de-969ba2261a21';`,

  deleteBoxType: `DELETE FROM boxtype WHERE
    uuid = '9d3cdce8-2603-4d64-b9de-969ba2261a21'`

}