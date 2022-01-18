// Import photofoundry. Since this is a Photoshop script, we have to use old school JS methods of importing scripts.
$.evalFile(activeDocument.path.fullName + "/photofoundry.js");

// Create the images
photofoundry(data(), {
    columns: 1,
    rows: 1,
    clean: data()[0] // This will reset the PSD file based on the first image specified in the JSON.
})

/*
From FTMdead:
I found this repository while trying to recreate my original build of the Gimpies.
The idea was to replicate the original build but with updated layers so that when I "infected" the gimpies the infected pieces would match the original pieces.

Full warning though- There was a bit of work editing the original metadata file to match the prerequisites of this script.

See the readme Ive included.
*/

// Define your JSON data.

function data() {
  return flatten([
    times(1 , {
      toggles: ["Lunchtime" , "Shadeless" , "Cheap" , "NannasNightie" , "Obsidian" , "BlueLeather" , "Chocolate" , "Infected"  , "SmokeyBlack"],
      text: false ,
      elements: false ,
      print: true
   }) ,      
   
   
   times(1 , {
      toggles: ["Lunchtime" , "StockingGimp" , "Cheap" , "NannasNightie" , "Tempered" , "Gimp_Glitch" , "Chocolate" , "Infected"  , "Blueberry"],
      text: false ,
      elements: false ,
      print: true
   }) ,      
   
   
   times(1 , {
      toggles: ["Lunchtime" , "LLCoolGimp" , "Cujo" , "PsychadelicRingerTee" , "Tempered" , "LatexBlack" , "CookiesandCream" , "Infected"  , "Blueberry"],
      text: false ,
      elements: false ,
      print: true
   }) ,      
   
  ]);     
} 
  