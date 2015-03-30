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
  
  var file = DocsList.getFilesByType(DocsList.FileType.DOCUMENT)[0];
  var folder = DocsList.getFolder(file.getParents()[0].getName());
  
  body.clear();
  var para=body.appendParagraph("Note: Folder names will be in black on top of each table and file names will be hyperlinks followed by their respective description, if any.\n");
  var para0=body.appendParagraph("This file will NOT be listed.\n");
  var qwerty="";
  var par=file.getParents()[0];
  var crumbs = [par.getName()];
  getstuff(folder,0,crumbs);
}
  
function getstuff(folders,level,crumbs)
{
   
  try
  {
  var qwerty="";
  qwerty=crumbs.join(' > ');
  var files = folders.getFiles();
  var fn = folders.getName()+n;
  var p = body.appendParagraph(qwerty);
  var table=body.appendTable();
  try
  {
    for (var i in files) 
  {
    
    var row=table.appendTableRow();
      
    var id=files[i].getId()
    var file=DriveApp.getFileById(id)
    var n=file.getName();
    var wn=DocumentApp.getActiveDocument().getName();
    var d=file.getDescription();
    if(n!=wn&&d!="")
    {
      var o=row.appendTableCell().setText(n);
      o.setLinkUrl( file.getUrl());    
    }
    if(n!=wn&&d!="")
    {
      var o=row.appendTableCell().setText(d);      
    }
    else if(n!=wn)
    {
      var o=row.appendTableCell().setText(n);
      o.setLinkUrl(file.getUrl())
     
    }
   
  }
  }catch(e){throw "Error has occured.nPlease re-execute";}
      

  var folders = folders.getFolders()
  for (var i in folders) 
  {
    getstuff(folders[i],level+1, crumbs.concat([folders[i].getName()]))
  }
  }  catch(e) {throw "Error has occured.nPlease re-execute";}
  
}


   
 
 

  
  
 

