function load_ready() {
  select_bg = document.getElementById("select_bg");
  pattern = select_constructor("pattern", patterns_list);
  select_bg.innerHTML = pattern;

  select_ic = document.getElementById("select_ic");
  icon = select_constructor("icon", icons_list);
  select_ic.innerHTML = icon;
}

function select_constructor(name, list) {
  menu_name = name + "_menu";
  initial = name.replace(/^(.).*/, "$1");
  action = "show_preview();";
  if (name == "icon") { action = "load_image('icon'); show_preview();" }
  drop_down = '<select name="' + menu_name + '" id="' + menu_name + '" accesskey="' + initial + '" onchange="' + action + '">\n';

  for (i = 0; i < list.length; i++) {
    p = list[i];
    drop_down += '  <option value="' + p + '">' + p + '</option>\n';
  }
  drop_down += '</select>';
  return drop_down;
}

function load_image(u) {
  img = document.getElementById("card_image");
  url = document.getElementById("image_url").value;
  if (u == "icon") { url = load_icon() }
  img.src = url;
}

function load_text() {
  message = document.getElementById("message");
  message_preview = document.getElementById("message_preview");
  message_preview.innerHTML = message.value;
}

function load_pattern() {
  pattern_menu = document.getElementById("pattern_menu");
  card = document.getElementById("card_container");
  bg = "https://raw.githubusercontent.com/mike-hearn/transparent-textures/master/patterns/" + pattern_menu.value + ".png";
  url = 'url("' + bg + '")';
  if (pattern_menu.value == "No Background Pattern") { url = "" }
  card.style.backgroundImage = url;
}

function load_icon() {
  icon_menu = document.getElementById("icon_menu");
  
  // Define your image URLs here
  const iconUrls = {
    "Diwali Diya": "https://png.pngtree.com/png-vector/20240815/ourmid/pngtree-an-intricately-designed-diwali-diya-png-image_13491222.png",
    "Gold Diya": "https://png.pngtree.com/png-clipart/20231109/original/pngtree-diwali-diya-png-image_13523452.png",
    "Rocket": "https://www.pngkey.com/png/full/967-9671794_diwali-stickers-messages-sticker.png",
    "Pink diya": "https://png.pngtree.com/png-clipart/20240129/original/pngtree-3d-decorative-luminous-transparent-png-image_14176879.png",
    "2 Rocket": "https://i.pinimg.com/originals/6e/04/ae/6e04aec4006f70cfe4996f5547e3b075.png"
    
    // Add other icons similarly
  };
  
  // Get the icon URL based on the selected value
  ic = iconUrls[icon_menu.value] || ""; // Default to empty if not found

  // Clear icon selection
  if (icon_menu.value == "Select Image") { 
    ic = ""; 
  }
  
  document.getElementById("image_url").value = ic;
  return ic;
}


function load_bg_color() {
  card = document.getElementById("card_container");
  card.style.backgroundColor = "#005c99";
}

function show_preview() {
  load_image("url");
  load_text();
  load_pattern();

  const i = document.getElementById("image_url");
  const m = document.getElementById("message");
  const c = document.getElementById("card_container");
  const p = document.getElementById("pattern_menu");
  const s = document.getElementById("sender");
  const r = document.getElementById("recipient");

  const ib64 = window.btoa(encodeURI(i.value));
  const mb64 = window.btoa(encodeURI(m.value));
  const sb64 = window.btoa(encodeURI(s.value));
  const rb64 = window.btoa(encodeURI(r.value));
  const bp64 = window.btoa(encodeURI(p.value));
  const bc64 = window.btoa(encodeURI(c.style.backgroundColor));

  const card_url = document.getElementById("card_url");
  const current_loc = location.href.replace(/\/[^\/]+$/, "/");
  const receive = current_loc + 'receive.html';
  const query_string = '?i=' + ib64 + '&m=' + mb64 + '&bc=' + bc64 + '&bp=' + bp64 + '&rb=' + rb64 + '&sb=' + sb64;

  let recipient = "";
  if (r.value) { recipient = " - Send this to " + r.value + "!" }
  
  // Create button instead of a link
  card_url.innerHTML = `
    <button style="background-color: #20f785; color: white; padding: 5.2px 15px; border: none; border-radius: 5px; cursor: pointer;">
      <a href="${receive + query_string}" target="_blank" style="color: white; text-decoration: none;">Share</a>
    </button>
    ${recipient}`;
}

function import_card() {
  base_url = location.href;
  url = window.import_url.value;
  code = url.replace(/^.*\/receive.html/, "/receive.html");
  target = base_url.replace(/\/$/, "") + code;
  window.location = target;
}

function toggle_preview() {
  preview = document.getElementById("preview_container");
  if (preview.style.display == "") {
    preview.style.display = "none";
  } else {
    preview.style.display = "";
  }
}

icons_list = [ "Stickers",  "Diwali Diya","Gold Diya","Rocket","Pink diya","2 Rocket" ]

patterns_list = [ "No Background Pattern", "3px-tile", "45-degree-fabric-dark", "always-grey", "arabesque", "arches", "argyle", "asfalt-dark", "asfalt-light", "assault", "axiom-pattern", "az-subtle", "back-pattern", "basketball", "batthern", "bedge-grunge", "beige-paper", "billie-holiday", "binding-dark", "binding-light", "black-felt", "black-linen", "black-linen-2", "black-lozenge", "black-mamba", "black-orchid", "black-paper", "black-scales", "black-thread-light", "black-thread", "black-twill", "blizzard", "blu-stripes", "bo-play", "brick-wall-dark", "brick-wall", "bright-squares", "brilliant", "broken-noise", "brushed-alum-dark", "brushed-alum", "buried", "candyhole", "carbon-fibre", "carbon-fibre-big", "carbon-fibre-v2", "cardboard-flat", "cardboard", "cartographer", "checkered-light-emboss", "checkered-pattern", "church", "circles", "classy-fabric", "clean-gray-paper", "clean-textile", "climpek", "cloth-alike", "concrete-wall", "concrete-wall-2", "concrete-wall-3", "connected", "corrugation", "cream-dust", "cream-paper", "cream-pixels", "crisp-paper-ruffles", "crissxcross", "cross-scratches", "cross-stripes", "crossword", "cubes", "cutcube", "dark-brick-wall", "dark-circles", "dark-denim", "dark-denim-3", "dark-dot", "dark-dotted-2", "dark-exa", "dark-fish-skin", "dark-geometric", "dark-leather", "dark-matter", "dark-mosaic", "dark-stripes-light", "dark-stripes", "dark-tire", "dark-wall", "dark-wood", "darth-stripe", "debut-dark", "debut-light", "diagmonds-light", "diagmonds", "diagonal-noise", "diagonal-striped-brick", "diagonal-waves", "diagonales-decalees", "diamond-eyes", "diamond-upholstery", "diamonds-are-forever", "dimension", "dirty-old-black-shirt", "dotnoise-light-grey", "double-lined", "dust", "ecailles", "egg-shell", "elastoplast", "elegant-grid", "embossed-paper", "escheresque-dark", "escheresque", "exclusive-paper", "fabric-1-dark", "fabric-1-light", "fabric-of-squares", "fabric-plaid", "fake-brick", "fake-luxury", "fancy-deboss", "farmer", "felt", "first-aid-kit", "flower-trail", "flowers", "foggy-birds", "food", "football-no-lines", "french-stucco", "fresh-snow", "gold-scale", "gplay", "gradient-squares", "graphcoders-lil-fiber", "graphy-dark", "graphy", "gravel", "gray-floral", "gray-lines", "gray-sand", "green-cup", "green-dust-and-scratches", "green-fibers", "green-gobbler", "grey-jean", "grey-sandbag", "grey-washed-wall", "greyzz", "grid-me", "grid-noise", "grid", "grilled-noise", "groovepaper", "grunge-wall", "gun-metal", "handmade-paper", "hexabump", "hexellence", "hixs-evolution", "hoffman", "honey-im-subtle", "ice-age", "inflicted", "inspiration-geometry", "iron-grip", "kinda-jean", "knitted-netting", "knitted-sweater", "kuji", "large-leather", "leather", "light-aluminum", "light-gray", "light-grey-floral-motif", "light-honeycomb-dark", "light-honeycomb", "light-mesh", "light-paper-fibers", "light-sketch", "light-toast", "light-wool", "lined-paper", "lined-paper-2", "little-knobs", "little-pluses", "little-triangles", "low-contrast-linen", "lyonnette", "maze-black", "maze-white", "mbossed", "medic-packaging-foil", "merely-cubed", "micro-carbon", "mirrored-squares", "mocha-grunge", "mooning", "moulin", "my-little-plaid-dark", "my-little-plaid", "nami", "nasty-fabric", "natural-paper", "navy", "nice-snow", "nistri", "noise-lines", "noise-pattern-with-subtle-cross-lines", "noisy-grid", "noisy-net", "noisy", "norwegian-rose", "notebook-dark", "notebook", "office", "old-husks", "old-map", "old-mathematics", "old-moon", "old-wall", "otis-redding", "outlets", "p1", "p2", "p4", "p5", "p6", "padded-light", "padded", "paper", "paper-1", "paper-2", "paper-3", "paper-fibers", "paven", "perforated-white-leather", "pineapple-cut", "pinstripe-dark", "pinstripe-light", "pinstriped-suit", "pixel-weave", "polaroid", "polonez-pattern", "polyester-lite", "pool-table", "project-paper", "ps-neutral", "psychedelic", "purty-wood", "pw-pattern", "pyramid", "quilt", "random-grey-variations", "ravenna", "real-carbon-fibre", "rebel", "redox-01", "redox-02", "reticular-tissue", "retina-dust", "retina-wood", "retro-intro", "rice-paper", "rice-paper-2", "rice-paper-3", "robots", "rocky-wall", "rough-cloth-light", "rough-cloth", "rough-diagonal", "rubber-grip", "sandpaper", "satin-weave", "scribble-light", "shattered-dark", "shattered", "shine-caro", "shine-dotted", "shley-tree-1", "shley-tree-2", "silver-scales", "simple-dashed", "simple-horizontal-light", "skeletal-weave", "skewed-print", "skin-side-up", "skulls", "slash-it", "small-crackle-bright", "small-crosses", "smooth-wall-dark", "smooth-wall-light", "sneaker-mesh-fabric", "snow", "soft-circle-scales", "soft-kill", "soft-pad", "soft-wallpaper", "solid", "sos", "sprinkles", "squairy", "squared-metal", "squares", "stacked-circles", "stardust", "starring", "stitched-wool", "strange-bullseyes", "straws", "stressed-linen", "stucco", "subtle-carbon", "subtle-dark-vertical", "subtle-dots", "subtle-freckles", "subtle-grey", "subtle-grunge", "subtle-stripes", "subtle-surface", "subtle-white-feathers", "subtle-zebra-3d", "subtlenet", "swirl", "tactile-noise-dark", "tactile-noise-light", "tapestry", "tasky", "tex2res1", "tex2res2", "tex2res3", "tex2res4", "tex2res5", "textured-paper", "textured-stripes", "texturetastic-gray", "ticks", "tileable-wood-colored", "tileable-wood", "tiny-grid", "translucent-fibres", "transparent-square-tiles", "tree-bark", "triangles", "triangles-2", "triangular", "tweed", "twinkle-twinkle", "txture", "type", "use-your-illusion", "vaio", "vertical-cloth", "vichy", "vintage-speckles", "wall-4-light", "washi", "wave-grid", "wavecut", "weave", "wet-snow", "white-bed-sheet", "white-brick-wall", "white-brushed", "white-carbon", "white-carbonfiber", "white-diamond-dark", "white-diamond", "white-leather", "white-linen", "white-paperboard", "white-plaster", "white-sand", "white-texture", "white-tiles", "white-wall", "white-wall-2", "white-wall-3", "white-wall-3-2", "white-wave", "whitey", "wide-rectangles", "wild-flowers", "wild-oliva", "wine-cork", "wood-pattern", "wood", "worn-dots", "woven-light", "woven", "xv", "zig-zag" ];
