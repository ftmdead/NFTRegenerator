# NFT Regenerator
 Regenerating NFT images from a main metadata file and then editing new metadata to match.

Original repositories:
Hashlips Art Engine: https://github.com/HashLips/hashlips_art_engine
Megazear7's Photofoundry: https://github.com/megazear7/photofoundry
Pistell's JSON Splitter: https://github.com/pistell/nft-maker-pro-uploader-v2


From FTMdead:
This a bastard repository made of individual repositories I found while trying to recreate my original build of the Gimpies.
The idea was to replicate the original build but with updated layers so that when I "infected" the Gimpies the infected pieces would match the original pieces.
Im sure theres probably a better way to do this and more code-savvy people will surely prevail in finding a better way but this suited my time frame and limited experience.

Full warning though- There was a bit of work editing the original metadata file to match the prerequisites of this script as well as using Photoshop to optimize the newly generated images for web.

Step 0.5:
Generating a collection of NFTS using HashLips Art Engine.
Hashlips provides a great explanation using his engine to generate a collection but more importantly this makes the master metadata file that will be used for the following steps.

Step 1: Photofoundry
Photofoundry is a script for Photoshop which takes the uploaded layers in the stack and uses JSON to generate new images (the original script generated JPEGS I have since edited the script to generate PNGs).

**USE CASE**: 
Generate a new collection of NFTs with new attributes matching the original metadata file.
 1. You must have Photoshop.
 2. Start Photoshop and load the example template.psd found in the Photofoundry folder.
 3. Move all your layers into the "toggles" folder in the stack. It is important that you organize your layers in correct order. See step 5.
 4. Copy original metadata file to edit for the script.
 5. The script works backwards in comparison to the Hashlips Art Engine. The Hashlips Art engine builds an image from the bottom up whereas Photofoundry builds an image from the top layer down.
    This is important to remember when editing your copied metadata file as you need to rearrange the order of the original attributes.
 6. Edit your metadata. Heres an example of how I foolishly did this by hand.
 
  Heres an example of how my metadata has been generated using the Hashlips Art Engine:

  {
  "name": "Gimp #13",
  "description": "The strangest family on Fantom..",
  "image": "example.uri",
  "edition": 13,
  "attributes": [
    {
      "trait_type": "Backdrop",
      "value": "Smokey Black",
      "frequency": "1.8%",
      "count": 45
    },
    {
      "trait_type": "Skin",
      "value": "Chocolate",
      "frequency": "24.24%",
      "count": 606
    },
    {
      "trait_type": "Face",
      "value": "Blue Leather",
      "frequency": "11.68%",
      "count": 292
    },
    {
      "trait_type": "Zip",
      "value": "Obsidian",
      "frequency": "11.72%",
      "count": 293
    },
    {
      "trait_type": "Shading",
      "value": "Shading",
      "frequency": "99.52%",
      "count": 2488
    },
    {
      "trait_type": "Outline",
      "value": "Outline",
      "frequency": "99.52%",
      "count": 2488
    },
    {
      "trait_type": "Fashion",
      "value": "Nanna's Nightie",
      "frequency": "5.76%",
      "count": 144
    },
    {
      "trait_type": "Choker",
      "value": "Cheap",
      "frequency": "41.96%",
      "count": 1049
    },
    {
      "trait_type": "Crown",
      "value": "Shadeless",
      "frequency": "32.92%",
      "count": 823
    },
    {
      "trait_type": "Peepers",
      "value": "Lunchtime",
      "frequency": "15%",
      "count": 375
    }
 
 And heres an example of my metadata with the attributes for how the script will generate the new image. This format can be found in "1. Photofoundry/masterScript.js":
 Its critical that your layer names in the stack match layer names in the script. It might also be beneficial to remove any spaces and special characters from the attributes names in both.


    times(1 , {
      toggles: ["Lunchtime" , "Shadeless" , "Cheap" , "NannasNightie" , "Obsidian" , "BlueLeather" , "Chocolate" , "Infected"  , "SmokeyBlack"],
      text: false ,
      elements: false ,
      print: true
 

 As you can see, there's a fair amount of work editing your copied metadata file, but if your reasonably handy in your preferred text editor you should make light work of this.
 I used the multiline tool in VScode. There's plenty of tutorials how to use this feature.

 Once this has been completed, in Photoshop go file -> Scripts -> Browse and load masterScript.js

 If any error messages pop up, your attribute names in the stack and in the script are probably don't match.

 If all works well you should see the new images generate into the Photofoundry folder. 
 Move these to a new folder and upload that folder to your ifps.


2. Splitter
Now that we've made our images and uploaded them to an ifps server we need to make new metadata.
Splitter.js reads the main metadata file and prints out individual json files for each image.
So once again, you should make (another) copy of your main data and batch replace the current ifps address with the new one aswell as make any other changes to the copied metadata file.
Now your'e going to need to wrap each json object in the main file (using the multiline tool again.)

Another example
This:

[
  {
    "name": "Gimp #1",
    "description": "The strangest family on Fantom..",
    "image": "https://example.mypninata.cloud/ifps/example.1png",
    "edition": 1,
    "attributes": [
      {
        "trait_type": "Legends",
        "value": "The Dead",
        "frequency": "0.04%",
        "count": 1
      }
    ],
    "compiler": "HashLips Art Engine"
  },
]

Becomes this:

[
  {
    "edition": 1,
    "data": {
      "name": "Gimp #1",
      "description": "The strangest family on Fantom..",
      "image": "https://example.mypninata.cloud/ifps/example.1png",
      "edition": 1,
      "attributes": [
        {
          "trait_type": "Legends",
          "value": "The Dead",
          "frequency": "0.04%",
          "count": 1
        },
        {
          "trait_type": "Infection Status",
          "value": "Immune",
          "frequency": "0.48%",
          "count": 12
        }
      ],
      "compiler": "HashLips Art Engine"
    }
  },
]

The second example shows the metadata wrapped with "edition": 1, and "data": { 
The splitter.js script will read edition 1 and the information in the data body and print out the new metadata files. 

Read the original read.me in the splitter file to install the script correctly.
Then simply copy your edited metadata file into _metadata.json file in the splitter folder and in a new terminal write "node splitter.js" and the invididual json files should be printed into the IndividualMetadata file as 1.json, 2.json etc.

And thats it!
 
I know these are crude instructions but I hope I've explained everything with enough detail that you're successful in your journeys.


     

