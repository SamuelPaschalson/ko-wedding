IMAGES — Nkiruka & Ositadinma
=============================

Every photo here is referenced from src/data/site.js. Swap a photo by dropping
in a file with the same name (same shape/ratio) — no code changes needed.

RESPONSIVE SIZES
----------------
Each photo ships in three widths so phones don't download desktop files:

    hero.jpg            full size   (~2000px+ wide)
    hero-800.jpg        800px wide
    hero-1400.jpg       1400px wide

src/components/Plate.jsx builds the srcset automatically from the base name.
If you add a new photo, generate the -800 and -1400 siblings too, e.g.:

    magick new.jpg -resize 800x  -quality 82 new-800.jpg
    magick new.jpg -resize 1400x -quality 84 new-1400.jpg

THE LANDING PAGE (two crops, on purpose)
----------------------------------------
    hero.jpg          2400x1500  wide crop, used on tablets/desktop
    hero-mobile.jpg   1200x1500  the full 4:5 frame, used on phones

Phones get the uncropped portrait version so nobody's face is cut off, and the
names sit on a solid ivory panel underneath the photo (not on top of it), so
the type stays sharp. Both come from the same photograph.

PAGE PHOTOGRAPHS (4:5 portrait)
-------------------------------
    story-lead.jpg    Our Story, main
    story-small.jpg   Our Story, inline
    day.jpg           The Day
    party.jpg         Our People
    rsvp.jpg          RSVP
    gifts.jpg         Gifts

THE VENUE (landscape)
---------------------
    location.jpg      1356x904 — Queens Park Events Centre signage.
                      Shown on the Guest Guide in a 3:2 frame
                      (class "plate--wide") because it is landscape.

GALLERY — PRE-WEDDING SHOOT ONLY
--------------------------------
    pre-01.jpg ... pre-14.jpg

The gallery is deliberately just the couple's pre-wedding shoot. The bridal
train and groom's men sets were removed. To add guest photos after the
wedding, add a new set to gallery.sets in src/data/site.js.

BRIDAL PARTY PORTRAITS
----------------------
    gal-01.jpg ... gal-08.jpg   individual bridal party portraits

NOTE: there is no photo for Mary yet — gal-09.jpg is referenced but missing,
and the site simply shows a graceful placeholder until you add it.

Also still to confirm: which portrait belongs to which name on the bride's
side. See party-reference.jpg (sent in chat) and tell me the order.
