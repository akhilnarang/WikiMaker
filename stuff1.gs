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
  var mimeType="application/vnd.google-apps.document"
  var file=DriveApp.getFilesByType(mimeType);
  var folder=file.next().getParents();
    while(folder.hasNext())
  {
    var f=folder.next()
    body.appendParagraph(f.getName())
    var files=f.getFiles()
    for (var i in files)
    {   
      var id=files[i].getId();
      var file=DriveApp.getFileById(id)
      var n=file.getName();
      var wn=DocumentApp.getActiveDocument().getName();
      var d=file.getDescription();
      if(n!=wn&&d!="")
      {
        var nam=body.appendParagraph(n);
        nam.setLinkUrl(file.getUrl());
      }
      if(n!=wn&&d!="")
      {
        body.appendParagraph(d)      
      }
      else if(n!=wn)
      {
        var nam=body.appendParagraph(n)
        nam.setLinkUrl(file.getUrl())
      }
    }
  }
}
