var body = DocumentApp.getActiveDocument().getBody();
 
function onInstall(e)
{
  onOpen(e);
}

function onOpen(e)
{   
  
  var ui=DocumentApp.getUi()
  ui.createMenu("Wiki")
  .addItem('Make Wiki','wiki')
  .addToUi();
  ui.createMenu("Description")
  .addItem('Set Description', 'description')
  .addToUi();
}
function description()
{
  var ui=DocumentApp.getUi();
  var rn=ui.prompt("Enter file name");
  var name=rn.getResponseText();
  var file=DriveApp.getFilesByName(name);
  var f=file.next();
  var rd=ui.prompt("Enter description");
  var d=rd.getResponseText();  
  f.setDescription(d);
}
function wiki()
{
  var file=DriveApp.getFiles();
  body.appendParagraph(file.next());
  while(file.hasNext());
  body.appendParagraph(file.next());
}
