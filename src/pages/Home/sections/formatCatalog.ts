/**
 * Every format the engine identifies, what it is called, what it is usually named on disk,
 * and one line on what it actually is.
 *
 * Tags, display names and extensions are the engine's own, from format_descriptor.cpp. The
 * descriptions are written for this site. Adding a format to the engine means adding it here
 * too: nothing keeps the two in step on its own.
 *
 * Left out: UNKNOWN and ARCHIVE are internal buckets rather than formats, and FBX_ASCII is
 * folded into FBX.
 */

export type FormatEntry = {
  /** What the badge shows, and what the engine reports. */
  tag: string;
  /** The engine's own display name. */
  name: string;
  /** Advisory only: detection never consults these. */
  extensions: string[];
  description: string;
};

export type FormatGroup = { name: string; formats: FormatEntry[] };

export const FORMAT_GROUPS: FormatGroup[] = [
  {
    name: "Archives",
    formats: [
      {
        tag: "ZIP",
        name: "ZIP archive",
        extensions: [".zip"],
        description:
          "The everyday archive: a central directory at the end and one compressed stream per entry. Half the formats on this list are a ZIP with a convention on top."
      },
      {
        tag: "RAR",
        name: "RAR archive",
        extensions: [".rar"],
        description:
          "WinRAR's archive. Solid compression and recovery records; entries are listed and read without unpacking the whole file."
      },
      {
        tag: "7Z",
        name: "7z archive",
        extensions: [".7z"],
        description:
          "The 7-Zip archive. LZMA by default, and a header that can itself be compressed, so the member list has to be decoded before anything can be listed."
      },
      {
        tag: "TAR",
        name: "TAR archive",
        extensions: [".tar"],
        description:
          "A tape archive: no compression and no index, just 512-byte headers back to back. Every entry below it here is a TAR inside a compressor."
      },
      {
        tag: "TAR.GZ",
        name: "gzip-compressed TAR archive",
        extensions: [".tar.gz", ".tgz"],
        description:
          "A TAR wrapped in a gzip stream. Decompressed in memory, then read as the TAR it is."
      },
      {
        tag: "TAR.BZ2",
        name: "bzip2-compressed TAR archive",
        extensions: [".tar.bz2", ".tbz2", ".tbz"],
        description:
          "A TAR wrapped in bzip2. Slower, smaller, and still a TAR underneath."
      },
      {
        tag: "TAR.XZ",
        name: "xz-compressed TAR archive",
        extensions: [".tar.xz", ".txz"],
        description:
          "A TAR wrapped in xz. The usual shape of a source release or a kernel tree."
      },
      {
        tag: "TAR.ZST",
        name: "zstd-compressed TAR archive",
        extensions: [".tar.zst", ".tzst"],
        description:
          "A TAR wrapped in Zstandard: near-gzip speed at close to xz ratios, which is why packagers keep moving to it."
      },
      {
        tag: "GZIP",
        name: "gzip stream",
        extensions: [".gz"],
        description:
          "One compressed stream and nothing else, with no member list. Very often a TAR, so what is inside is identified rather than assumed."
      },
      {
        tag: "BZIP2",
        name: "bzip2 stream",
        extensions: [".bz2"],
        description:
          "A single Burrows-Wheeler compressed stream. Same shape as gzip: one member, known only by reading it."
      },
      {
        tag: "XZ",
        name: "xz stream",
        extensions: [".xz"],
        description:
          "A single LZMA2 stream with integrity checks. One member, like gzip."
      },
      {
        tag: "ZSTD",
        name: "zstd stream",
        extensions: [".zst", ".zstd"],
        description:
          "A single Zstandard stream. Fast, and what .tar.zst and several package formats now sit on."
      },
      {
        tag: "AR",
        name: "ar archive",
        extensions: [".a", ".lib"],
        description:
          "The Unix archive. The outer layer of every .deb, and of every static library."
      },
      {
        tag: "CPIO",
        name: "cpio archive",
        extensions: [".cpio"],
        description:
          "The archive inside an RPM, and inside every initramfs. A header per file and no index at all."
      },
      {
        tag: "CAB",
        name: "Microsoft cabinet",
        extensions: [".cab"],
        description:
          "Microsoft's cabinet. What an MSI, a driver package or a Windows update carries its files in."
      },
      {
        tag: "ISO",
        name: "ISO 9660 disc image",
        extensions: [".iso", ".img"],
        description:
          "An ISO 9660 disc image. Its volume descriptor sits 32KB in, so an image is confirmed by structure rather than by anything at offset zero."
      },
      {
        tag: "UDF",
        name: "UDF disc image",
        extensions: [".iso", ".img", ".udf"],
        description:
          "The filesystem that replaced ISO 9660 on optical media. Found by walking the recognition sequence past 32KB rather than by searching for its mark, and a bridge disc, which is both, is reported as this one."
      },
      {
        tag: "RPM",
        name: "RPM package",
        extensions: [".rpm"],
        description:
          "A Red Hat package: a lead, two header sections, and a compressed cpio payload that is reached and then opened as its own archive."
      },
      {
        tag: "DEB",
        name: "Debian package",
        extensions: [".deb", ".udeb"],
        description:
          "A Debian package. An ar archive holding control and data tarballs, each of which opens in turn."
      },
      {
        tag: "MSI",
        name: "Windows Installer package",
        extensions: [".msi", ".msp"],
        description:
          "A Windows Installer database. A compound file underneath, with the install tables held as streams."
      }
    ]
  },
  {
    name: "Packages",
    formats: [
      {
        tag: "JAR",
        name: "Java archive",
        extensions: [".jar"],
        description:
          "A ZIP with a manifest. What makes it a JAR is what META-INF holds, not what the file is called."
      },
      {
        tag: "WAR",
        name: "Java web archive",
        extensions: [".war"],
        description:
          "A Java web archive: a JAR laid out as a deployable web application."
      },
      {
        tag: "EAR",
        name: "Java enterprise archive",
        extensions: [".ear"],
        description:
          "A Java enterprise archive, holding WARs and JARs that each open again."
      },
      {
        tag: "APK",
        name: "Android package",
        extensions: [".apk", ".aab"],
        description:
          "An Android package: a ZIP with a manifest, a DEX payload and a signing block."
      },
      {
        tag: "EPUB",
        name: "EPUB publication",
        extensions: [".epub"],
        description:
          "An e-book. A ZIP of XHTML, CSS and images, with an OPF package file naming the reading order."
      },
      {
        tag: "3MF",
        name: "3D Manufacturing Format package",
        extensions: [".3mf"],
        description:
          "3D Manufacturing Format. A ZIP of XML describing a printable model, meant to replace STL."
      },
      {
        tag: "USDZ",
        name: "Universal Scene Description package",
        extensions: [".usdz"],
        description:
          "A USD package: an uncompressed ZIP holding a scene and its textures, which is what AR viewers consume."
      }
    ]
  },
  {
    name: "Executables & shortcuts",
    formats: [
      {
        tag: "PE",
        name: "Windows PE binary",
        extensions: [".exe", ".dll", ".sys", ".ocx", ".cpl", ".scr"],
        description:
          "The Windows executable. DOS stub, COFF header, section table, and anything appended past the last section, which is exactly where an installer hides its payload."
      },
      {
        tag: "ELF",
        name: "ELF binary",
        extensions: [".so", ".elf"],
        description:
          "The Unix and Linux binary. Program headers say how to load it, section headers describe everything else."
      },
      {
        tag: "MACH-O",
        name: "Mach-O binary",
        extensions: [".dylib", ".bundle"],
        description:
          "The macOS binary. One architecture, or several stacked together in one fat file."
      },
      {
        tag: "JAVA-CLASS",
        name: "Java class file",
        extensions: [".class"],
        description:
          "A compiled Java class. It opens with CAFEBABE, and so does a fat Mach-O, so it is claimed from the version and the constant pool behind that magic rather than from the magic itself."
      },
      {
        tag: "LNK",
        name: "Windows shortcut",
        extensions: [".lnk"],
        description:
          "A Windows shortcut. Structure describing a target elsewhere, including the path, the arguments and the machine it was made on, but never the target itself."
      }
    ]
  },
  {
    name: "Documents",
    formats: [
      {
        tag: "PDF",
        name: "PDF document",
        extensions: [".pdf"],
        description:
          "A PDF. It has no member table, but the attachments it carries exist independently of it, so those are real containment and they open."
      },
      {
        tag: "OLE",
        name: "compound file",
        extensions: [".ole", ".bin"],
        description:
          "The compound file: a whole filesystem inside one file, with storages and streams. Word, Excel, PowerPoint, MSI and Outlook messages are all this underneath."
      },
      {
        tag: "DOC",
        name: "Word 97-2003 document",
        extensions: [".doc", ".dot"],
        description:
          "Word 97-2003. A compound file whose WordDocument stream holds the text."
      },
      {
        tag: "XLS",
        name: "Excel 97-2003 workbook",
        extensions: [".xls", ".xlt", ".xla"],
        description:
          "Excel 97-2003. A compound file of BIFF records."
      },
      {
        tag: "PPT",
        name: "PowerPoint 97-2003 presentation",
        extensions: [".ppt", ".pps", ".pot"],
        description:
          "PowerPoint 97-2003, in the same compound file shape."
      },
      {
        tag: "DOCX",
        name: "Word document",
        extensions: [".docx", ".docm", ".dotx"],
        description:
          "Word since 2007. A ZIP of XML parts, which is why it opens as an archive and why every part inside it opens too."
      },
      {
        tag: "XLSX",
        name: "Excel workbook",
        extensions: [".xlsx", ".xlsm", ".xltx"],
        description:
          "Excel since 2007. A ZIP of XML: one part per sheet, plus the shared string table every cell points into."
      },
      {
        tag: "PPTX",
        name: "PowerPoint presentation",
        extensions: [".pptx", ".pptm", ".potx"],
        description:
          "PowerPoint since 2007. A ZIP of XML with one part per slide."
      },
      {
        tag: "ODT",
        name: "OpenDocument text",
        extensions: [".odt"],
        description:
          "OpenDocument text. The same idea as DOCX with a different vocabulary."
      },
      {
        tag: "ODS",
        name: "OpenDocument spreadsheet",
        extensions: [".ods"],
        description:
          "OpenDocument spreadsheet."
      },
      {
        tag: "ODP",
        name: "OpenDocument presentation",
        extensions: [".odp"],
        description:
          "OpenDocument presentation."
      },
      {
        tag: "RTF",
        name: "Rich Text Format document",
        extensions: [".rtf"],
        description:
          "Rich Text Format. Plain text carrying braces and control words; the pictures and objects in it live inside the text as escaped hex rather than as stored files."
      }
    ]
  },
  {
    name: "Markup",
    formats: [
      {
        tag: "HTML",
        name: "HTML document",
        extensions: [".html", ".htm"],
        description:
          "A web page. No signature at all, and probed before XML deliberately: over half the pages on a machine are well formed enough for the XML parser to claim them, and calling one an XML document is the wrong answer."
      },
      {
        tag: "XML",
        name: "XML document",
        extensions: [".xml"],
        description:
          "An XML document. It has no signature at all, so it is recognised by parsing a bounded prefix and finding a declaration and a well-formed root."
      },
      {
        tag: "XHTML",
        name: "XHTML document",
        extensions: [".xhtml", ".xht"],
        description:
          "HTML that is also valid XML. Told apart from plain XML by its root element, the same way a ZIP becomes a DOCX."
      },
      {
        tag: "SVG",
        name: "SVG image",
        extensions: [".svg"],
        description:
          "Vector graphics written as XML. Same refinement: the root element is what names it."
      }
    ]
  },
  {
    name: "Mail & data",
    formats: [
      {
        tag: "MSG",
        name: "Outlook message",
        extensions: [".msg", ".oft"],
        description:
          "An Outlook message. A compound file whose streams hold the headers, the body and every attachment."
      },
      {
        tag: "EML",
        name: "email message",
        extensions: [".eml"],
        description:
          "An RFC 5322 message. No signature either, so it is recognised by a header block whose every line parses, and its MIME parts open as real attachments."
      },
      {
        tag: "MBOX",
        name: "mailbox",
        extensions: [".mbox"],
        description:
          "A mailbox: many messages concatenated, each opening with a From line. Every message inside opens again as an EML."
      },
      {
        tag: "MHT",
        name: "MHTML web archive",
        extensions: [".mht", ".mhtml"],
        description:
          "A page saved as one MIME message. The same syntax as a mail message, so what it is gets settled once the parts have been read, and every part it holds opens on its own."
      },
      {
        tag: "SQLITE",
        name: "SQLite database",
        extensions: [".db", ".sqlite", ".sqlite3", ".db3"],
        description:
          "A SQLite database. Sixteen bytes of text, confirmed by a page layout the format fixes. Nothing inside it is a file, so its pages and tables are structure rather than containment."
      },
      {
        tag: "JSON",
        name: "JSON document",
        extensions: [".json"],
        description:
          "A JSON document. Probed after glTF, which is JSON with a vocabulary the engine already knows, so an asset stays an asset and a document that is only JSON lands here."
      },
      {
        tag: "CSV",
        name: "CSV table",
        extensions: [".csv"],
        description:
          "A delimited table. No signature and no syntax of its own, only repeated rectangular structure to go on, which makes it the weakest claim the engine makes."
      }
    ]
  },
  {
    name: "Images",
    formats: [
      {
        tag: "PNG",
        name: "PNG image",
        extensions: [".png"],
        description:
          "Chunks, each with a length, a type and a CRC. IHDR first, IEND last, and anything in between, including the EXIF a camera left there."
      },
      {
        tag: "JPEG",
        name: "JPEG image",
        extensions: [".jpg", ".jpeg", ".jpe", ".jfif"],
        description:
          "Marker segments: the picture, and whatever the camera wrote into APP1 beside it."
      },
      {
        tag: "GIF",
        name: "GIF image",
        extensions: [".gif"],
        description:
          "A screen descriptor, a colour table, and one image descriptor per frame."
      },
      {
        tag: "BMP",
        name: "Windows bitmap",
        extensions: [".bmp", ".dib"],
        description:
          "The Windows bitmap. Two very ordinary leading bytes, so it is confirmed by the header it declares rather than by BM alone."
      },
      {
        tag: "TIFF",
        name: "TIFF image",
        extensions: [".tif", ".tiff"],
        description:
          "Image file directories of tagged fields. The base format every camera raw on this list is built on."
      },
      {
        tag: "ICO",
        name: "Windows icon",
        extensions: [".ico", ".cur"],
        description:
          "A Windows icon: a directory of images at several sizes, each one a PNG or a bitmap in its own right."
      },
      {
        tag: "HEIF",
        name: "HEIF image",
        extensions: [".heic", ".heif", ".hif"],
        description:
          "An ISO base media file carrying stills instead of tracks, told apart from an MP4 by the brands in its ftyp box."
      },
      {
        tag: "AVIF",
        name: "AVIF image",
        extensions: [".avif"],
        description:
          "The same container as HEIF, with AV1 inside it."
      },
      {
        tag: "WEBP",
        name: "WebP image",
        extensions: [".webp"],
        description:
          "A RIFF form like WAVE, told apart by the four bytes sitting past the size."
      },
      {
        tag: "DDS",
        name: "DirectDraw surface",
        extensions: [".dds"],
        description:
          "A DirectDraw surface: texture data, mip levels and all, laid out the way the GPU wants it."
      },
      {
        tag: "PSD",
        name: "Photoshop document",
        extensions: [".psd", ".psb"],
        description:
          "A Photoshop document: layers, channels and the flattened composite in one file. A .psb is the same format with eight-byte lengths."
      }
    ]
  },
  {
    name: "Camera raw",
    formats: [
      {
        tag: "CR2",
        name: "Canon CR2 raw image",
        extensions: [".cr2"],
        description:
          "Canon's raw image. A TIFF underneath, and which raw it is comes from the tags it carries."
      },
      {
        tag: "NEF",
        name: "Nikon NEF raw image",
        extensions: [".nef"],
        description:
          "Nikon's raw image, also TIFF-based."
      },
      {
        tag: "ARW",
        name: "Sony ARW raw image",
        extensions: [".arw"],
        description:
          "Sony's raw image, also TIFF-based."
      },
      {
        tag: "DNG",
        name: "Adobe DNG image",
        extensions: [".dng"],
        description:
          "Adobe's open raw format. TIFF-based, and the one most other raws can be converted into."
      },
      {
        tag: "RAW",
        name: "camera raw image",
        extensions: [".raw", ".orf", ".rw2", ".pef", ".srw", ".3fr", ".iiq", ".erf", ".dcr", ".kdc", ".mos", ".mef"],
        description:
          "A raw the engine can prove but cannot attribute: TIFF-based sensor data whose tags name no maker it knows. Olympus, Panasonic, Pentax and the rest land here."
      }
    ]
  },
  {
    name: "Fonts",
    formats: [
      {
        tag: "TTF",
        name: "TrueType font",
        extensions: [".ttf"],
        description:
          "A TrueType font. Tables such as glyf, cmap and name are parts of one file rather than files stored inside it."
      },
      {
        tag: "OTF",
        name: "OpenType font",
        extensions: [".otf"],
        description:
          "An OpenType font: the same table structure, with CFF outlines instead of TrueType ones."
      },
      {
        tag: "TTC",
        name: "font collection",
        extensions: [".ttc", ".otc"],
        description:
          "A font collection. Several faces sharing one set of tables, rather than members that could be taken out on their own."
      },
      {
        tag: "WOFF",
        name: "Web Open Font Format",
        extensions: [".woff"],
        description:
          "A web font: an sfnt whose tables have each been deflated, behind four bytes no font file itself begins with."
      },
      {
        tag: "WOFF2",
        name: "Web Open Font Format 2",
        extensions: [".woff2"],
        description:
          "The same idea rebuilt on Brotli, with every table in one stream and the glyphs transformed, which is what makes it a format of its own rather than a version."
      }
    ]
  },
  {
    name: "Audio",
    formats: [
      {
        tag: "MP3",
        name: "MPEG audio",
        extensions: [".mp3", ".mp2", ".mp1"],
        description:
          "MPEG audio frames, confirmed by parsing the frames themselves, plus whatever ID3 has been wrapped around them."
      },
      {
        tag: "AAC",
        name: "AAC audio stream",
        extensions: [".aac", ".adts"],
        description:
          "A bare AAC stream with no container at all, recognised by validating the ADTS frames it opens with."
      },
      {
        tag: "WAV",
        name: "WAVE audio",
        extensions: [".wav", ".wave", ".bwf"],
        description:
          "RIFF chunks around PCM. The fmt chunk says how to read the data chunk."
      },
      {
        tag: "AIFF",
        name: "AIFF audio",
        extensions: [".aiff", ".aif", ".aifc"],
        description:
          "Apple's IFF. The same chunk walk as WAV, with every size big-endian."
      },
      {
        tag: "FLAC",
        name: "FLAC audio",
        extensions: [".flac"],
        description:
          "Lossless audio: a chain of metadata blocks, then the frames."
      },
      {
        tag: "OGG",
        name: "Ogg audio",
        extensions: [".ogg", ".oga", ".opus", ".spx"],
        description:
          "Ogg pages, carrying Vorbis, Opus or FLAC."
      },
      {
        tag: "M4A",
        name: "MPEG-4 audio",
        extensions: [".m4a", ".m4b", ".m4p"],
        description:
          "MPEG-4 audio. The MP4 container with an audio track and no video."
      }
    ]
  },
  {
    name: "Video",
    formats: [
      {
        tag: "MP4",
        name: "MPEG-4 video",
        extensions: [".mp4", ".m4v", ".mp4v"],
        description:
          "The ISO base media container. A tree of boxes: moov describes the file, mdat holds it."
      },
      {
        tag: "MOV",
        name: "QuickTime movie",
        extensions: [".mov", ".qt"],
        description:
          "QuickTime, the container MP4 was standardised from, with the same box tree."
      },
      {
        tag: "AVI",
        name: "AVI video",
        extensions: [".avi"],
        description:
          "A RIFF container. Older and simpler, and still everywhere."
      },
      {
        tag: "MKV",
        name: "Matroska video",
        extensions: [".mkv", ".mka", ".mks", ".mk3d"],
        description:
          "Matroska: an EBML tree, which is a binary XML in all but name."
      },
      {
        tag: "WEBM",
        name: "WebM video",
        extensions: [".webm"],
        description:
          "Matroska restricted to free codecs."
      },
      {
        tag: "ASF",
        name: "Windows Media",
        extensions: [".wma", ".wmv", ".asf"],
        description:
          "Windows Media. One 16-byte GUID, which is as unambiguous as a signature gets."
      },
      {
        tag: "MPEG-TS",
        name: "MPEG transport stream",
        extensions: [".ts", ".m2t", ".mpegts", ".tsv"],
        description:
          "A transport stream: 188-byte packets in a grid, confirmed by the program association table sitting on that grid."
      },
      {
        tag: "MPEG-PS",
        name: "MPEG program stream",
        extensions: [".mpg", ".mpeg", ".vob", ".m2p"],
        description:
          "A program stream. Pack start codes, confirmed by each pack's declared length landing exactly where the next one begins. A .vob is one of these."
      },
      {
        tag: "M2TS",
        name: "Blu-ray / AVCHD transport stream",
        extensions: [".m2ts", ".mts"],
        description:
          "The Blu-ray and AVCHD transport stream: MPEG-TS with a timestamp on every packet."
      },
      {
        tag: "H.264",
        name: "H.264 video stream",
        extensions: [".h264", ".264", ".avc"],
        description:
          "A bare H.264 stream. No container, so it is confirmed by parsing the parameter sets the codec itself defines."
      },
      {
        tag: "H.265",
        name: "H.265 video stream",
        extensions: [".h265", ".265", ".hevc"],
        description:
          "A bare H.265 stream, recognised the same way."
      },
      {
        tag: "MPEG-VIDEO",
        name: "MPEG video stream",
        extensions: [".m1v", ".m2v", ".mpv", ".mp2v"],
        description:
          "A bare MPEG-1 or MPEG-2 video stream, confirmed by a sequence header whose declared length lands on the next start code. A .mpg opening with a pack is a program stream instead."
      }
    ]
  },
  {
    name: "3D & CAD",
    formats: [
      {
        tag: "GLB",
        name: "glTF binary model",
        extensions: [".glb"],
        description:
          "glTF in one binary file: a JSON chunk describing the scene, and a binary chunk holding the buffers."
      },
      {
        tag: "GLTF",
        name: "glTF model",
        extensions: [".gltf"],
        description:
          "glTF as JSON, with its buffers and textures sitting beside it."
      },
      {
        tag: "OBJ",
        name: "Wavefront OBJ model",
        extensions: [".obj"],
        description:
          "Wavefront OBJ. Text: vertices, faces, and a reference to a material file."
      },
      {
        tag: "STL",
        name: "Stereolithography model",
        extensions: [".stl"],
        description:
          "Stereolithography. Triangles and nothing else, which is why 3D printing settled on it."
      },
      {
        tag: "PLY",
        name: "Polygon file format model",
        extensions: [".ply"],
        description:
          "The Stanford polygon format. A text header declaring the elements, then the data in text or binary."
      },
      {
        tag: "DAE",
        name: "COLLADA model",
        extensions: [".dae"],
        description:
          "COLLADA: a whole scene graph written as XML."
      },
      {
        tag: "FBX",
        name: "Autodesk FBX model",
        extensions: [".fbx"],
        description:
          "Autodesk's interchange format. A node tree of properties; the ASCII variant is the same tree spelled out."
      },
      {
        tag: "3DS",
        name: "3D Studio model",
        extensions: [".3ds"],
        description:
          "The 3D Studio format. A chunk tree, and still the lingua franca for older assets."
      },
      {
        tag: "BLEND",
        name: "Blender scene",
        extensions: [".blend"],
        description:
          "A Blender scene: effectively a memory dump, with a DNA block describing its own structures so it can be read back."
      },
      {
        tag: "USDA",
        name: "USD scene description (text)",
        extensions: [".usda", ".usd"],
        description:
          "USD written as text."
      },
      {
        tag: "USDC",
        name: "USD scene description (crate)",
        extensions: [".usdc", ".usd"],
        description:
          "USD written as a crate binary."
      },
      {
        tag: "ABC",
        name: "Alembic scene cache (Ogawa)",
        extensions: [".abc"],
        description:
          "Alembic. A baked scene cache in the Ogawa layout, used to hand animation between tools."
      },
      {
        tag: "STEP",
        name: "STEP exchange structure (Part 21)",
        extensions: [".step", ".stp", ".p21"],
        description:
          "ISO 10303 Part 21. CAD exchange as text, one entity per line."
      },
      {
        tag: "IGES",
        name: "IGES exchange file",
        extensions: [".iges", ".igs"],
        description:
          "The older CAD exchange format: fixed 80-column records."
      },
      {
        tag: "DXF",
        name: "AutoCAD drawing exchange file",
        extensions: [".dxf"],
        description:
          "AutoCAD's drawing exchange format. Group codes and values, in pairs, all the way down."
      }
    ]
  },
  {
    name: "Game assets",
    formats: [
      {
        tag: "UNITY-BUNDLE",
        name: "Unity asset bundle",
        extensions: [".unity3d", ".assetbundle"],
        description:
          "A Unity asset bundle: a header, then one compressed level after another. Its members exist only once the body has been decompressed, so listing one means decoding the front of it."
      },
      {
        tag: "UNITY-SERIALIZED",
        name: "Unity serialized file",
        extensions: [".assets", ".unity", ".resource"],
        description:
          "Unity's own asset file. No signature of any kind: it is recognised by its metadata ending exactly where its header says it does."
      },
      {
        tag: "RPA",
        name: "Ren'Py archive",
        extensions: [".rpa"],
        description:
          "Ren'Py's archive. A header line saying where the index sits, and a zlib stream holding that index of everything the archive carries."
      },
      {
        tag: "RENPY-RPC2",
        name: "Ren'Py compiled script",
        extensions: [".rpyc", ".rpymc"],
        description:
          "A compiled Ren'Py script: slots of zlib-compressed Python pickle, which is walked symbolically and never executed."
      },
      {
        tag: "RPGMV-ASSET",
        name: "RPG Maker encrypted asset",
        extensions: [".rpgmvp", ".rpgmvo", ".rpgmvm", ".png_", ".ogg_", ".m4a_"],
        description:
          "An RPG Maker MV asset: sixteen bytes of header, sixteen more exclusive-ored against the project's key, and the original file untouched from there. The payload proves the key by itself, so the project is not needed to read it."
      }
    ]
  }
];

export const FORMAT_TOTAL = FORMAT_GROUPS.reduce((sum, group) => sum + group.formats.length, 0);

/**
 * Leading signatures, for the page's own probe.
 *
 * This is deliberately not the engine. The engine confirms a signature against
 * the structure behind it, and settles another sixty formats by parsing them
 * when they carry no signature of their own. This table is the first stage only,
 * and the ones it cannot do are the point rather than a gap.
 *
 * Ordered most specific first: the first entry that matches wins, so CR2 has to
 * come before TIFF, HEIF before MP4 and UDF before ISO.
 *
 * CAFEBABE stays with Mach-O: a Java class file opens with the same four bytes,
 * and what tells them apart is a version rather than a mark, which is exactly
 * the kind of reading this table does not do.
 */
export type Signature = { tag: string; parts: Array<{ at: number; bytes: number[] }> };

/** ASCII to bytes, so a signature reads as what it is. */
function ascii(text: string): number[] {
  return Array.from(text, (character) => character.charCodeAt(0));
}

export const SIGNATURES: Signature[] = [
  { tag: "DEB", parts: [{ at: 0, bytes: ascii("!<arch>") }, { at: 8, bytes: ascii("debian-binary") }] },
  { tag: "AR", parts: [{ at: 0, bytes: ascii("!<arch>") }] },
  { tag: "ZIP", parts: [{ at: 0, bytes: [0x50, 0x4b, 0x03, 0x04] }] },
  { tag: "RAR", parts: [{ at: 0, bytes: [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07] }] },
  { tag: "7Z", parts: [{ at: 0, bytes: [0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c] }] },
  { tag: "GZIP", parts: [{ at: 0, bytes: [0x1f, 0x8b] }] },
  { tag: "BZIP2", parts: [{ at: 0, bytes: ascii("BZh") }] },
  { tag: "XZ", parts: [{ at: 0, bytes: [0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00] }] },
  { tag: "ZSTD", parts: [{ at: 0, bytes: [0x28, 0xb5, 0x2f, 0xfd] }] },
  { tag: "CAB", parts: [{ at: 0, bytes: ascii("MSCF") }] },
  { tag: "RPM", parts: [{ at: 0, bytes: [0xed, 0xab, 0xee, 0xdb] }] },
  { tag: "CPIO", parts: [{ at: 0, bytes: ascii("070701") }] },
  { tag: "CPIO", parts: [{ at: 0, bytes: ascii("070707") }] },
  { tag: "UNITY-BUNDLE", parts: [{ at: 0, bytes: ascii("UnityWeb") }] },
  { tag: "UNITY-BUNDLE", parts: [{ at: 0, bytes: ascii("UnityRaw") }] },
  { tag: "RPA", parts: [{ at: 0, bytes: ascii("RPA-3.0 ") }] },
  { tag: "RENPY-RPC2", parts: [{ at: 0, bytes: ascii("RENPY RPC2") }] },
  { tag: "RPGMV-ASSET", parts: [{ at: 0, bytes: ascii("RPGMV") }, { at: 5, bytes: [0x00, 0x00, 0x00] }] },
  { tag: "UDF", parts: [{ at: 34817, bytes: ascii("NSR02") }] },
  { tag: "UDF", parts: [{ at: 34817, bytes: ascii("NSR03") }] },
  { tag: "UDF", parts: [{ at: 36865, bytes: ascii("NSR02") }] },
  { tag: "UDF", parts: [{ at: 36865, bytes: ascii("NSR03") }] },
  { tag: "ISO", parts: [{ at: 32769, bytes: ascii("CD001") }] },
  { tag: "PDF", parts: [{ at: 0, bytes: ascii("%PDF-") }] },
  { tag: "OLE", parts: [{ at: 0, bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] }] },
  { tag: "RTF", parts: [{ at: 0, bytes: ascii("{\rtf") }] },
  { tag: "SQLITE", parts: [{ at: 0, bytes: ascii("SQLite format 3") }] },
  { tag: "LNK", parts: [{ at: 0, bytes: [0x4c, 0x00, 0x00, 0x00, 0x01, 0x14, 0x02, 0x00] }] },
  { tag: "PE", parts: [{ at: 0, bytes: ascii("MZ") }] },
  { tag: "ELF", parts: [{ at: 0, bytes: [0x7f, 0x45, 0x4c, 0x46] }] },
  { tag: "MACH-O", parts: [{ at: 0, bytes: [0xcf, 0xfa, 0xed, 0xfe] }] },
  { tag: "MACH-O", parts: [{ at: 0, bytes: [0xce, 0xfa, 0xed, 0xfe] }] },
  { tag: "MACH-O", parts: [{ at: 0, bytes: [0xca, 0xfe, 0xba, 0xbe] }] },
  { tag: "PNG", parts: [{ at: 0, bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }] },
  { tag: "GIF", parts: [{ at: 0, bytes: ascii("GIF8") }] },
  { tag: "JPEG", parts: [{ at: 0, bytes: [0xff, 0xd8, 0xff] }] },
  { tag: "PSD", parts: [{ at: 0, bytes: ascii("8BPS") }] },
  { tag: "ICO", parts: [{ at: 0, bytes: [0x00, 0x00, 0x01, 0x00] }] },
  { tag: "DDS", parts: [{ at: 0, bytes: ascii("DDS ") }] },
  { tag: "WEBP", parts: [{ at: 0, bytes: ascii("RIFF") }, { at: 8, bytes: ascii("WEBP") }] },
  { tag: "WAV", parts: [{ at: 0, bytes: ascii("RIFF") }, { at: 8, bytes: ascii("WAVE") }] },
  { tag: "AVI", parts: [{ at: 0, bytes: ascii("RIFF") }, { at: 8, bytes: ascii("AVI ") }] },
  { tag: "AIFF", parts: [{ at: 0, bytes: ascii("FORM") }, { at: 8, bytes: ascii("AIFF") }] },
  { tag: "FLAC", parts: [{ at: 0, bytes: ascii("fLaC") }] },
  { tag: "OGG", parts: [{ at: 0, bytes: ascii("OggS") }] },
  { tag: "MP3", parts: [{ at: 0, bytes: ascii("ID3") }] },
  { tag: "CR2", parts: [{ at: 0, bytes: [0x49, 0x49, 0x2a, 0x00] }, { at: 8, bytes: ascii("CR") }] },
  { tag: "TIFF", parts: [{ at: 0, bytes: [0x49, 0x49, 0x2a, 0x00] }] },
  { tag: "TIFF", parts: [{ at: 0, bytes: [0x4d, 0x4d, 0x00, 0x2a] }] },
  { tag: "AVIF", parts: [{ at: 4, bytes: ascii("ftyp") }, { at: 8, bytes: ascii("avif") }] },
  { tag: "HEIF", parts: [{ at: 4, bytes: ascii("ftyp") }, { at: 8, bytes: ascii("heic") }] },
  { tag: "M4A", parts: [{ at: 4, bytes: ascii("ftyp") }, { at: 8, bytes: ascii("M4A ") }] },
  { tag: "MOV", parts: [{ at: 4, bytes: ascii("ftyp") }, { at: 8, bytes: ascii("qt  ") }] },
  { tag: "MP4", parts: [{ at: 4, bytes: ascii("ftyp") }] },
  { tag: "MKV", parts: [{ at: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] }] },
  { tag: "ASF", parts: [{ at: 0, bytes: [0x30, 0x26, 0xb2, 0x75, 0x8e, 0x66, 0xcf, 0x11] }] },
  { tag: "WOFF2", parts: [{ at: 0, bytes: ascii("wOF2") }] },
  { tag: "WOFF", parts: [{ at: 0, bytes: ascii("wOFF") }] },
  { tag: "OTF", parts: [{ at: 0, bytes: ascii("OTTO") }] },
  { tag: "TTC", parts: [{ at: 0, bytes: ascii("ttcf") }] },
  { tag: "TTF", parts: [{ at: 0, bytes: [0x00, 0x01, 0x00, 0x00] }] },
  { tag: "GLB", parts: [{ at: 0, bytes: ascii("glTF") }] },
  { tag: "BLEND", parts: [{ at: 0, bytes: ascii("BLENDER") }] },
  { tag: "PLY", parts: [{ at: 0, bytes: ascii("ply") }] },
  { tag: "STEP", parts: [{ at: 0, bytes: ascii("ISO-10303-21") }] },
  { tag: "BMP", parts: [{ at: 0, bytes: ascii("BM") }] }
];

/**
 * Enough for every signature above. The far end of it is UDF, whose recognition
 * sequence sits a sector or two past the descriptor an ISO keeps 32KB in.
 */
export const PROBE_LENGTH = 36_880;

export function formatByTag(tag: string): FormatEntry | undefined {
  for (const group of FORMAT_GROUPS) {
    const found = group.formats.find((format) => format.tag === tag);
    if (found) return found;
  }
  return undefined;
}

/** The first signature these bytes satisfy, or nothing. */
export function identify(bytes: Uint8Array): FormatEntry | undefined {
  const holds = (part: { at: number; bytes: number[] }) =>
    part.bytes.every((byte, index) => bytes[part.at + index] === byte);

  const hit = SIGNATURES.find((signature) => signature.parts.every(holds));
  return hit ? formatByTag(hit.tag) : undefined;
}
