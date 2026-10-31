/**
 * Every format the engine identifies, what it is called, what it is usually named on disk,
 * and one line on what it actually is.
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
          "An archive that groups files and folders in one file. Each entry can be compressed or stored unchanged; a central directory records its name and location."
      },
      {
        tag: "RAR",
        name: "RAR archive",
        extensions: [".rar"],
        description:
          "An archive format used by WinRAR, with support for compression, encryption, split volumes and optional recovery records."
      },
      {
        tag: "7Z",
        name: "7z archive",
        extensions: [".7z"],
        description:
          "The 7-Zip archive format, supporting several compression methods, encryption and solid compression, which compresses multiple files together."
      },
      {
        tag: "TAR",
        name: "TAR archive",
        extensions: [".tar"],
        description:
          "An archive that stores files, directories and their metadata in a sequence of records. TAR does not compress data itself and is often combined with a separate compressor."
      },
      {
        tag: "TAR.GZ",
        name: "gzip-compressed TAR archive",
        extensions: [".tar.gz", ".tgz"],
        description:
          "A TAR archive compressed with gzip. TAR groups the files and their metadata; gzip compresses the resulting archive."
      },
      {
        tag: "TAR.BZ2",
        name: "bzip2-compressed TAR archive",
        extensions: [".tar.bz2", ".tbz2", ".tbz"],
        description:
          "A TAR archive compressed with bzip2. It combines TAR's file and directory records with lossless bzip2 compression."
      },
      {
        tag: "TAR.XZ",
        name: "xz-compressed TAR archive",
        extensions: [".tar.xz", ".txz"],
        description:
          "A TAR archive compressed in the XZ format, typically using LZMA2 compression. Commonly used to distribute software source code."
      },
      {
        tag: "TAR.ZST",
        name: "zstd-compressed TAR archive",
        extensions: [".tar.zst", ".tzst"],
        description:
          "A TAR archive compressed with Zstandard. It combines TAR's file and directory records with a compressor designed for fast compression and decompression."
      },
      {
        tag: "TAR.LZ",
        name: "lzip-compressed TAR archive",
        extensions: [".tar.lz", ".tlz"],
        description:
          "A TAR archive compressed with lzip. TAR records the files and directories, while the lzip wrapper compresses the archive using LZMA."
      },
      {
        tag: "TAR.LZMA",
        name: "LZMA-compressed TAR archive",
        extensions: [".tar.lzma"],
        description:
          "A TAR archive compressed using the legacy LZMA stream format. Decompressing the stream reveals TAR's file and directory records."
      },
      {
        tag: "GZIP",
        name: "gzip stream",
        extensions: [".gz"],
        description:
          "A lossless compression format using DEFLATE. It compresses a byte stream and can contain concatenated members; multiple files are commonly grouped in TAR before compression."
      },
      {
        tag: "BZIP2",
        name: "bzip2 stream",
        extensions: [".bz2"],
        description:
          "A lossless compression format based on the Burrows-Wheeler transform. It compresses data without providing a file directory, so it is often paired with TAR."
      },
      {
        tag: "XZ",
        name: "xz stream",
        extensions: [".xz"],
        description:
          "A lossless compression container, typically using LZMA2, with support for integrity checks. Often used to compress individual files or TAR archives."
      },
      {
        tag: "ZSTD",
        name: "zstd stream",
        extensions: [".zst", ".zstd"],
        description:
          "A lossless compression format using Zstandard, designed for fast compression and decompression. Used for compressed files, archives and software package payloads."
      },
      {
        tag: "LZIP",
        name: "lzip stream",
        extensions: [".lz"],
        description:
          "A lossless compression format that wraps LZMA-compressed data with integrity information. It compresses a byte stream and is often paired with TAR to hold multiple files."
      },
      {
        tag: "LZMA",
        name: "LZMA stream (legacy .lzma)",
        extensions: [".lzma"],
        description:
          "The legacy standalone LZMA compression format. Its header describes the compression settings and uncompressed size, followed by one compressed byte stream."
      },
      {
        tag: "AR",
        name: "ar archive",
        extensions: [".a", ".lib"],
        description:
          "A simple archive format commonly used for Unix static libraries. It stores named members and also serves as the outer container for Debian packages."
      },
      {
        tag: "CPIO",
        name: "cpio archive",
        extensions: [".cpio"],
        description:
          "An archive format that stores files and filesystem metadata as a sequence of entries. Used in Linux initramfs images and many RPM package payloads."
      },
      {
        tag: "XAR",
        name: "XAR archive",
        extensions: [".xar", ".xip"],
        description:
          "An archive with a compressed XML table of contents describing its members and where their data is stored. It is also the container used by flat macOS installer packages."
      },
      {
        tag: "CAB",
        name: "Microsoft cabinet",
        extensions: [".cab"],
        description:
          "Microsoft's Cabinet archive format, used to distribute installation files and updates. It supports compression and archives split across multiple cabinet files."
      },
      {
        tag: "ISO",
        name: "ISO 9660 disc image",
        extensions: [".iso", ".img"],
        description:
          "A disc image containing an ISO 9660 filesystem, commonly used for software distribution and CD images. Extensions such as Joliet and Rock Ridge add filename and metadata features."
      },
      {
        tag: "UDF",
        name: "UDF disc image",
        extensions: [".iso", ".img", ".udf"],
        description:
          "A disc image containing the Universal Disk Format filesystem, used on DVDs, Blu-ray discs and other media. A disc can contain both UDF and ISO 9660 structures."
      },
      {
        tag: "RPM",
        name: "RPM package",
        extensions: [".rpm"],
        description:
          "A software package used by RPM-based Linux distributions. It contains package metadata, dependency information and a file payload, commonly stored as a compressed cpio archive."
      },
      {
        tag: "DEB",
        name: "Debian package",
        extensions: [".deb", ".udeb"],
        description:
          "A Debian software package stored as an ar archive. It contains a format version marker, a control archive with package metadata and a data archive with installable files."
      },
      {
        tag: "MSI",
        name: "Windows Installer package",
        extensions: [".msi", ".msp"],
        description:
          "A Windows Installer database containing the tables and instructions used to install software. Stored in a compound file, it can embed cabinet archives or reference external installation files."
      }
    ]
  },
  {
    name: "Packages",
    formats: [
      {
        tag: "APPLE-PKG",
        name: "macOS installer package",
        extensions: [".pkg", ".mpkg"],
        description:
          "A flat macOS installer package stored as a XAR archive. Installer metadata describes the package or distribution alongside its installation payload."
      },
      {
        tag: "JAR",
        name: "Java archive",
        extensions: [".jar"],
        description:
          "A ZIP-based archive for Java classes and resources. An optional manifest provides information such as the application entry point, and the archive can include digital signatures."
      },
      {
        tag: "WAR",
        name: "Java web archive",
        extensions: [".war"],
        description:
          "A ZIP-based package for deploying a Java web application. It can contain web pages, compiled classes, libraries and configuration under the WEB-INF directory."
      },
      {
        tag: "EAR",
        name: "Java enterprise archive",
        extensions: [".ear"],
        description:
          "A ZIP-based package for a Java enterprise application. It groups application modules, such as WAR and JAR files, with shared libraries and deployment metadata."
      },
      {
        tag: "APK",
        name: "Android package",
        extensions: [".apk", ".aab"],
        description:
          "A ZIP-based package for installing an Android application. It contains an Android manifest, resources and any compiled code; an Android App Bundle (.aab) is a separate publishing format used to generate APKs."
      },
      {
        tag: "EPUB",
        name: "EPUB publication",
        extensions: [".epub"],
        description:
          "An e-book publication packaged as a ZIP archive. It combines web content, such as XHTML, CSS and images, with metadata, navigation and a defined reading order."
      },
      {
        tag: "3MF",
        name: "3D Manufacturing Format package",
        extensions: [".3mf"],
        description:
          "A ZIP-based format for exchanging 3D printing models. XML parts describe geometry, units and build information, with support for materials and other print properties."
      },
      {
        tag: "USDZ",
        name: "Universal Scene Description package",
        extensions: [".usdz"],
        description:
          "A package for sharing USD scenes and their assets, including textures. It uses an uncompressed ZIP layout with alignment requirements and is commonly used for augmented reality."
      }
    ]
  },
  {
    name: "Disk images & filesystems",
    formats: [
      {
        tag: "UDIF",
        name: "Apple disk image",
        extensions: [".dmg"],
        description:
          "An Apple UDIF disk image. A block map describes how stored or compressed chunks reconstruct a logical disk, which can hold partitions and filesystems."
      },
      {
        tag: "APPLE-SPARSE-IMAGE",
        name: "Apple sparse disk image",
        extensions: [".sparseimage"],
        description:
          "An Apple disk image that stores allocated bands of a logical disk. Its band map records which parts are present without storing every unused region."
      },
      {
        tag: "APPLE-ASIF",
        name: "Apple sparse image (ASIF)",
        extensions: [".asif"],
        description:
          "An Apple sparse disk image using the ASIF format. Its header and directory map stored data to regions of the logical disk."
      },
      {
        tag: "APPLE-ENCRYPTED-IMAGE",
        name: "Apple encrypted disk image",
        extensions: [".dmg", ".sparseimage"],
        description:
          "An encrypted wrapper around an Apple disk image. The engine identifies the wrapper and requires a supplied password to unlock supported encrypted contents."
      },
      {
        tag: "PARTITIONED-DISK",
        name: "Partitioned disk image",
        extensions: [".img", ".raw"],
        description:
          "A disk image carrying an MBR, GPT or Apple partition map. The partition table identifies regions of the disk that can contain separate filesystems."
      },
      {
        tag: "HFS-PLUS",
        name: "HFS+ volume",
        extensions: [".hfs", ".hfsx"],
        description:
          "An Apple HFS+ or HFSX filesystem volume. Its catalog records folders, files and their metadata, while allocation structures locate their stored data."
      },
      {
        tag: "APFS",
        name: "APFS container",
        extensions: [".apfs"],
        description:
          "An Apple File System container holding checkpointed volumes. Each volume has its own filesystem structures describing directories, files and their data."
      },
      {
        tag: "NTFS",
        name: "NTFS volume",
        extensions: [".ntfs"],
        description:
          "A Windows NTFS filesystem volume. Its Master File Table and directory indexes describe files, folders, metadata and alternate data streams."
      },
      {
        tag: "EXT-FILESYSTEM",
        name: "ext2/ext3/ext4 filesystem",
        extensions: [".ext2", ".ext3", ".ext4"],
        description:
          "A Linux ext2, ext3 or ext4 filesystem. Feature flags identify the variant, and its inode and directory structures describe the files and folders stored in the volume."
      }
    ]
  },
  {
    name: "Virtual machines",
    formats: [
      {
        tag: "VDI",
        name: "VirtualBox disk image",
        extensions: [".vdi"],
        description:
          "A virtual disk used by VirtualBox. Its header and block map describe the guest disk and how its blocks are stored in the image."
      },
      {
        tag: "QCOW2",
        name: "QEMU copy-on-write image",
        extensions: [".qcow2", ".qcow"],
        description:
          "A QEMU virtual disk format with copy-on-write storage. Mapping tables locate guest disk data, with support for backing images and snapshots."
      },
      {
        tag: "VHD",
        name: "Virtual Hard Disk image",
        extensions: [".vhd", ".avhd"],
        description:
          "A Virtual Hard Disk image representing a guest disk. Fixed, dynamic and differencing layouts describe how disk data is stored or inherited from a parent image."
      },
      {
        tag: "VHDX",
        name: "Virtual Hard Disk v2 image",
        extensions: [".vhdx", ".avhdx"],
        description:
          "The second-generation Virtual Hard Disk format. Headers, metadata and block allocation tables describe the guest disk and its stored blocks."
      },
      {
        tag: "VMDK",
        name: "VMware virtual disk",
        extensions: [".vmdk"],
        description:
          "A VMware virtual disk represented by a descriptor, binary extents or both. The format maps guest disk sectors to stored data and can reference parent images."
      },
      {
        tag: "OVA",
        name: "OVF package (OVA)",
        extensions: [".ova"],
        description:
          "A virtual appliance packaged as a TAR archive whose first member is an OVF descriptor. It groups the virtual machine description with its disk images and other referenced files."
      },
      {
        tag: "OVF",
        name: "OVF descriptor",
        extensions: [".ovf"],
        description:
          "An XML descriptor in the Open Virtualization Format. It describes a virtual appliance's hardware and references the disk images and other files belonging to the package."
      },
      {
        tag: "VBOX",
        name: "VirtualBox machine settings",
        extensions: [".vbox", ".vbox-prev"],
        description:
          "A VirtualBox machine's XML settings file. It describes registered media, current storage attachments and snapshots, with references to files belonging to the machine."
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
          "The Portable Executable format used for Windows programs, DLLs and drivers. Headers and sections describe code, data, resources and information needed to load the binary."
      },
      {
        tag: "ELF",
        name: "ELF binary",
        extensions: [".so", ".elf"],
        description:
          "The Executable and Linkable Format, used for programs, shared libraries, object files and core dumps on Linux and other systems. Headers describe how its code and data are organized."
      },
      {
        tag: "MACH-O",
        name: "Mach-O binary",
        extensions: [".dylib", ".bundle"],
        description:
          "A binary format used for executables, libraries and object files on Apple platforms. A universal binary can package Mach-O files for multiple processor architectures."
      },
      {
        tag: "MACH-O-UNIVERSAL",
        name: "Mach-O universal binary",
        extensions: [".dylib", ".bundle"],
        description:
          "An Apple universal binary containing separate Mach-O files for different processor architectures. Its architecture table locates each binary within the container."
      },
      {
        tag: "DOS-MZ",
        name: "DOS executable",
        extensions: [".exe", ".ovl"],
        description:
          "A DOS executable using the MZ format. Its header describes the program's load image, relocations, memory requirements and entry point."
      },
      {
        tag: "NE",
        name: "16-bit Windows/OS/2 executable",
        extensions: [".exe", ".dll", ".drv", ".fon"],
        description:
          "The New Executable format used by 16-bit Windows and OS/2. Segment tables, imports, entry points and resources describe the program behind its DOS stub."
      },
      {
        tag: "LE",
        name: "Linear executable",
        extensions: [".exe", ".vxd", ".386"],
        description:
          "The Linear Executable format used by software including Windows virtual device drivers. Object, page and fixup tables describe how its code and data are loaded."
      },
      {
        tag: "LX",
        name: "OS/2 linear executable",
        extensions: [".exe", ".dll"],
        description:
          "The LX executable format used by OS/2 programs and libraries. It records objects, pages, imports and fixups behind a DOS-compatible header."
      },
      {
        tag: "JAVA-CLASS",
        name: "Java class file",
        extensions: [".class"],
        description:
          "A compiled class or interface for the Java Virtual Machine. It stores type information, a constant pool, fields and methods, including bytecode for methods with implementations."
      },
      {
        tag: "LNK",
        name: "Windows shortcut",
        extensions: [".lnk"],
        description:
          "A Windows Shell shortcut that references a file, folder or other target. It can store a target path, command-line arguments, a working directory and icon information."
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
          "The Portable Document Format, designed to preserve page layout across systems. A document can contain text, fonts, images, vector graphics, forms and embedded file attachments."
      },
      {
        tag: "OLE",
        name: "compound file",
        extensions: [".ole", ".bin"],
        description:
          "Microsoft's Compound File Binary Format, which organizes named data streams and storage directories inside one file. Used by older Office documents, Windows Installer databases and Outlook message files."
      },
      {
        tag: "DOC",
        name: "Word 97-2003 document",
        extensions: [".doc", ".dot"],
        description:
          "The binary document format used by Word 97-2003. It stores text, formatting and document structures in a compound file, with support for pictures and embedded objects."
      },
      {
        tag: "XLS",
        name: "Excel 97-2003 workbook",
        extensions: [".xls", ".xlt", ".xla"],
        description:
          "The binary workbook format used by Excel 97-2003. Spreadsheet records in a compound file describe worksheets, cell values, formulas, formatting and other workbook data."
      },
      {
        tag: "PPT",
        name: "PowerPoint 97-2003 presentation",
        extensions: [".ppt", ".pps", ".pot"],
        description:
          "The binary presentation format used by PowerPoint 97-2003. It stores slides, text, drawing objects and presentation data in a compound file."
      },
      {
        tag: "DOCX",
        name: "Word document",
        extensions: [".docx"],
        description:
          "An Office Open XML word-processing document packaged as ZIP. XML parts describe text, formatting and relationships to resources such as images."
      },
      {
        tag: "DOCM",
        name: "Word macro-enabled document",
        extensions: [".docm"],
        description:
          "A Word document stored as an Office Open XML ZIP package that can contain VBA macros alongside its text, formatting and embedded resources."
      },
      {
        tag: "DOTX",
        name: "Word template",
        extensions: [".dotx"],
        description:
          "An Office Open XML template for creating Word documents. Its ZIP package stores reusable document content, formatting, styles and resources."
      },
      {
        tag: "DOTM",
        name: "Word macro-enabled template",
        extensions: [".dotm"],
        description:
          "A Word template that can include VBA macros. Its Office Open XML ZIP package combines reusable document content and styles with macro-related parts."
      },
      {
        tag: "XLSX",
        name: "Excel workbook",
        extensions: [".xlsx"],
        description:
          "An Office Open XML spreadsheet packaged as ZIP. Its parts store worksheets, cell values, formulas, styles and other workbook data; text cells may use a shared string table or inline strings."
      },
      {
        tag: "XLSM",
        name: "Excel macro-enabled workbook",
        extensions: [".xlsm"],
        description:
          "An Excel workbook stored as an Office Open XML ZIP package that can contain VBA macros alongside worksheet data, formulas and formatting."
      },
      {
        tag: "XLTX",
        name: "Excel template",
        extensions: [".xltx"],
        description:
          "An Office Open XML template for creating Excel workbooks. Its ZIP package stores reusable worksheets, formulas, styles and workbook settings."
      },
      {
        tag: "XLTM",
        name: "Excel macro-enabled template",
        extensions: [".xltm"],
        description:
          "An Excel workbook template that can include VBA macros. Its ZIP package holds reusable spreadsheet content and formatting with macro-related parts."
      },
      {
        tag: "XLSB",
        name: "Excel binary workbook",
        extensions: [".xlsb"],
        description:
          "An Excel workbook packaged as ZIP with binary workbook and worksheet records. It stores spreadsheet data, formulas and styles and can include VBA macros."
      },
      {
        tag: "XLAM",
        name: "Excel add-in",
        extensions: [".xlam"],
        description:
          "An Excel add-in stored as an Office Open XML ZIP package. It can provide reusable functions and commands through VBA code and supporting workbook parts."
      },
      {
        tag: "PPTX",
        name: "PowerPoint presentation",
        extensions: [".pptx"],
        description:
          "An Office Open XML presentation packaged as ZIP. Its parts describe slides, layouts, themes, notes and linked or embedded media."
      },
      {
        tag: "PPTM",
        name: "PowerPoint macro-enabled presentation",
        extensions: [".pptm"],
        description:
          "A PowerPoint presentation stored as an Office Open XML ZIP package that can contain VBA macros alongside slides, themes, notes and media."
      },
      {
        tag: "PPSX",
        name: "PowerPoint show",
        extensions: [".ppsx"],
        description:
          "An Office Open XML presentation saved as a PowerPoint slide show. Its ZIP package contains slides, layouts, themes and presentation resources."
      },
      {
        tag: "PPSM",
        name: "PowerPoint macro-enabled show",
        extensions: [".ppsm"],
        description:
          "A PowerPoint slide show that can contain VBA macros. Its Office Open XML ZIP package stores the presentation and its supporting resources."
      },
      {
        tag: "POTX",
        name: "PowerPoint template",
        extensions: [".potx"],
        description:
          "An Office Open XML template for creating PowerPoint presentations. Its ZIP package stores reusable slide content, layouts, themes and resources."
      },
      {
        tag: "POTM",
        name: "PowerPoint macro-enabled template",
        extensions: [".potm"],
        description:
          "A PowerPoint presentation template that can include VBA macros. It combines reusable slides, layouts and themes with macro-related parts in a ZIP package."
      },
      {
        tag: "PPAM",
        name: "PowerPoint add-in",
        extensions: [".ppam"],
        description:
          "A PowerPoint add-in stored as an Office Open XML ZIP package. It can contain VBA code and supporting resources that provide additional presentation commands."
      },
      {
        tag: "ODT",
        name: "OpenDocument text",
        extensions: [".odt"],
        description:
          "An OpenDocument text document, used by applications such as LibreOffice Writer. Its ZIP package contains XML for document content, styles and metadata, along with resources such as images."
      },
      {
        tag: "ODS",
        name: "OpenDocument spreadsheet",
        extensions: [".ods"],
        description:
          "An OpenDocument spreadsheet, used by applications such as LibreOffice Calc. Its ZIP package stores sheet data, formulas, styles and metadata as XML, with any supporting resources."
      },
      {
        tag: "ODP",
        name: "OpenDocument presentation",
        extensions: [".odp"],
        description:
          "An OpenDocument presentation, used by applications such as LibreOffice Impress. Its ZIP package contains XML describing slides, text, styles and presentation resources."
      },
      {
        tag: "RTF",
        name: "Rich Text Format document",
        extensions: [".rtf"],
        description:
          "Rich Text Format, a text-based document format that uses control words and braces to describe text and formatting. It can also include encoded images and embedded objects."
      }
    ]
  },
  {
    name: "Text & markup",
    formats: [
      {
        tag: "TXT",
        name: "Plain text",
        extensions: [".txt", ".text", ".log", ".md", ".markdown"],
        description:
          "Text without a required container or document signature. The engine identifies its character encoding and line structure, including text stored as logs or Markdown."
      },
      {
        tag: "HTML",
        name: "HTML document",
        extensions: [".html", ".htm"],
        description:
          "The markup language used to structure web pages. Elements describe content such as headings, links, tables and forms, and can reference stylesheets, scripts and media."
      },
      {
        tag: "XML",
        name: "XML document",
        extensions: [".xml"],
        description:
          "A text-based format for structured data, using named elements, attributes and nested content. XML defines the syntax; the application or schema defines what the data means."
      },
      {
        tag: "XHTML",
        name: "XHTML document",
        extensions: [".xhtml", ".xht"],
        description:
          "HTML expressed using XML syntax. Elements must follow XML rules, including proper nesting and explicit closing, while representing familiar web page content."
      },
      {
        tag: "SVG",
        name: "SVG image",
        extensions: [".svg"],
        description:
          "Scalable Vector Graphics, an XML-based image format. It describes shapes, paths, text and effects that can scale without losing vector detail, and can also include raster images."
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
          "An Outlook message or template stored in Microsoft's compound file format. It holds message properties, recipients, body content and any attachments."
      },
      {
        tag: "EML",
        name: "email message",
        extensions: [".eml"],
        description:
          "An individual email message stored with its headers and body. MIME structures can describe alternative body formats, inline resources and file attachments."
      },
      {
        tag: "EMLX",
        name: "Apple Mail message",
        extensions: [".emlx"],
        description:
          "An individual message stored by Apple Mail. A byte count precedes the email message, with Apple Mail metadata following the message data."
      },
      {
        tag: "MBOX",
        name: "mailbox",
        extensions: [".mbox"],
        description:
          "A family of mailbox formats that stores multiple email messages in one text file. Messages are separated by lines beginning with 'From ', with escaping rules that vary by implementation."
      },
      {
        tag: "MHT",
        name: "MHTML web archive",
        extensions: [".mht", ".mhtml"],
        description:
          "A saved web page packaged as a MIME message, also called MHTML. It groups the page's HTML and resources, such as images and stylesheets, into one file."
      },
      {
        tag: "SQLITE",
        name: "SQLite database",
        extensions: [".db", ".sqlite", ".sqlite3", ".db3"],
        description:
          "A database file used by SQLite, an embedded SQL database engine. It stores tables, indexes and other database structures in pages within a single file."
      },
      {
        tag: "HDF5",
        name: "HDF5 data file",
        extensions: [".h5", ".hdf5", ".he5"],
        description:
          "A Hierarchical Data Format file that organizes data into groups, datasets and attributes. It is used for structured scientific and numerical data."
      },
      {
        tag: "JSON",
        name: "JSON document",
        extensions: [".json"],
        description:
          "A text-based data format with objects, arrays, strings, numbers, booleans and null. Commonly used for configuration, data exchange and web APIs."
      },
      {
        tag: "CSV",
        name: "CSV table",
        extensions: [".csv"],
        description:
          "A text format for tabular data, with records divided into fields, usually by commas. Quoting allows fields to contain separators or line breaks; delimiter and header conventions vary."
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
          "A raster image format with lossless compression and support for transparency. It stores pixel data and metadata in chunks and is commonly used for screenshots, diagrams and web graphics."
      },
      {
        tag: "JPEG",
        name: "JPEG image",
        extensions: [".jpg", ".jpeg", ".jpe", ".jfif"],
        description:
          "A compressed raster image format commonly used for photographs, usually with lossy compression. JPEG files can also carry metadata such as Exif camera settings and thumbnails."
      },
      {
        tag: "GIF",
        name: "GIF image",
        extensions: [".gif"],
        description:
          "A losslessly compressed image format with a palette of up to 256 colors per frame. It supports simple transparency and multiple frames for animation."
      },
      {
        tag: "BMP",
        name: "Windows bitmap",
        extensions: [".bmp", ".dib"],
        description:
          "A bitmap image format associated with Windows. It stores pixel data with image headers and, where needed, a color palette; data may be uncompressed or use supported compression methods."
      },
      {
        tag: "TIFF",
        name: "TIFF image",
        extensions: [".tif", ".tiff"],
        description:
          "A flexible raster image format that uses tagged fields to describe image data. It supports multiple images, varied color depths and several compression methods, and is widely used in scanning and imaging."
      },
      {
        tag: "ICO",
        name: "Windows icon",
        extensions: [".ico", ".cur"],
        description:
          "A Windows icon file that can contain multiple images at different sizes and color depths. Images may use bitmap or PNG encoding; the related CUR format adds cursor hotspot coordinates."
      },
      {
        tag: "HEIF",
        name: "HEIF image",
        extensions: [".heic", ".heif", ".hif"],
        description:
          "The High Efficiency Image File Format, a container for still images, image sequences and metadata. It supports different codecs; HEIC files commonly use HEVC compression."
      },
      {
        tag: "AVIF",
        name: "AVIF image",
        extensions: [".avif"],
        description:
          "An image format that stores AV1-compressed images in a HEIF-based container. It supports lossless and lossy compression, transparency, high dynamic range and image sequences."
      },
      {
        tag: "WEBP",
        name: "WebP image",
        extensions: [".webp"],
        description:
          "A raster image format developed for the web. It supports lossy and lossless compression, transparency and animation in a RIFF-based container."
      },
      {
        tag: "DDS",
        name: "DirectDraw surface",
        extensions: [".dds"],
        description:
          "The DirectDraw Surface format for textures and related graphics data. It can store compressed or uncompressed pixels, mipmaps, cube maps and texture arrays for graphics applications."
      },
      {
        tag: "PSD",
        name: "Photoshop document",
        extensions: [".psd", ".psb"],
        description:
          "Adobe Photoshop's document format, storing image data, layers, masks, channels and other editing information. The related PSB format supports larger documents."
      },
      {
        tag: "TGA",
        name: "Truevision TGA image",
        extensions: [".tga", ".icb", ".vda", ".vst"],
        description:
          "A Truevision raster image format supporting color-mapped, true-color and grayscale pixels. Image data can be stored directly or compressed with run-length encoding."
      },
      {
        tag: "RADIANCE-HDR",
        name: "Radiance HDR image",
        extensions: [".hdr", ".pic", ".rgbe", ".xyze"],
        description:
          "A high dynamic range image used by Radiance and other imaging tools. Pixels store RGB or XYZ color components with a shared exponent to represent a wide brightness range."
      },
      {
        tag: "QOI",
        name: "QOI image",
        extensions: [".qoi"],
        description:
          "The Quite OK Image format, a lossless raster format for RGB and RGBA pixels. It uses compact pixel operations designed for simple, fast encoding and decoding."
      },
      {
        tag: "NETPBM",
        name: "Netpbm image",
        extensions: [".pbm", ".pgm", ".ppm", ".pnm", ".pam", ".pfm"],
        description:
          "A family of portable bitmap, grayscale and color image formats. Text headers describe the image, followed by text or binary pixel data, including floating-point data in PFM."
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
          "Canon's TIFF-based raw photo format. It stores camera sensor data and capture metadata, typically with preview images, for processing in photo-editing software."
      },
      {
        tag: "NEF",
        name: "Nikon NEF raw image",
        extensions: [".nef"],
        description:
          "Nikon's raw photo format, based on TIFF structures. It preserves sensor data and camera metadata for later adjustments to settings such as exposure and white balance."
      },
      {
        tag: "ARW",
        name: "Sony ARW raw image",
        extensions: [".arw"],
        description:
          "Sony's raw photo format, based on TIFF structures. It stores sensor image data, camera metadata and previews for processing after capture."
      },
      {
        tag: "DNG",
        name: "Adobe DNG image",
        extensions: [".dng"],
        description:
          "Digital Negative, Adobe's publicly documented format for raw photographs. Based on TIFF, it stores image data and metadata needed to interpret and process the image."
      },
      {
        tag: "RAW",
        name: "camera raw image",
        extensions: [".raw", ".orf", ".rw2", ".pef", ".srw", ".3fr", ".iiq", ".erf", ".dcr", ".kdc", ".mos", ".mef"],
        description:
          "A general category for camera raw images rather than one universal file format. These files preserve sensor data and processing metadata in layouts that vary by camera manufacturer."
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
          "A font file using TrueType glyph outlines. Tables describe character mappings, glyph shapes, spacing and other information needed to display text."
      },
      {
        tag: "OTF",
        name: "OpenType font",
        extensions: [".otf"],
        description:
          "An OpenType font file, commonly using Compact Font Format (CFF) outlines with the .otf extension. OpenType supports advanced typography and can use either CFF or TrueType outlines."
      },
      {
        tag: "TTC",
        name: "font collection",
        extensions: [".ttc", ".otc"],
        description:
          "A font collection that groups multiple font faces in one file. Faces can share tables to reduce duplication; related .otc files are OpenType collections."
      },
      {
        tag: "WOFF",
        name: "Web Open Font Format",
        extensions: [".woff"],
        description:
          "A web font container for TrueType or OpenType font data. Individual font tables can be compressed with zlib, and the file can include metadata and private data."
      },
      {
        tag: "WOFF2",
        name: "Web Open Font Format 2",
        extensions: [".woff2"],
        description:
          "The second version of the Web Open Font Format. It uses Brotli compression and optional font-specific transformations to reduce the size of fonts delivered over the web."
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
          "Compressed MPEG audio, most commonly MPEG-1 or MPEG-2 Audio Layer III. Related MP1 and MP2 streams use other MPEG audio layers; files may also carry ID3 metadata."
      },
      {
        tag: "AAC",
        name: "AAC audio stream",
        extensions: [".aac", ".adts"],
        description:
          "Advanced Audio Coding, a lossy audio compression format. Standalone .aac files commonly use ADTS headers to frame the compressed audio; AAC can also be stored in containers such as MP4."
      },
      {
        tag: "WAV",
        name: "WAVE audio",
        extensions: [".wav", ".wave", ".bwf"],
        description:
          "The WAVE audio container, based on RIFF chunks. It commonly stores uncompressed PCM audio but can also hold other audio encodings and metadata."
      },
      {
        tag: "AIFF",
        name: "AIFF audio",
        extensions: [".aiff", ".aif", ".aifc"],
        description:
          "Apple's Audio Interchange File Format, a chunk-based container commonly used for uncompressed audio. The related AIFF-C format also supports compressed audio encodings."
      },
      {
        tag: "FLAC",
        name: "FLAC audio",
        extensions: [".flac"],
        description:
          "Free Lossless Audio Codec, which compresses audio while preserving the original samples exactly. A native FLAC file contains metadata blocks followed by compressed audio frames."
      },
      {
        tag: "OGG",
        name: "Ogg audio",
        extensions: [".ogg", ".oga", ".opus", ".spx"],
        description:
          "An open container for media streams, commonly used for Vorbis, Opus, Speex or FLAC audio. Ogg organizes encoded data into pages and can also carry video."
      },
      {
        tag: "M4A",
        name: "MPEG-4 audio",
        extensions: [".m4a", ".m4b", ".m4p"],
        description:
          "An MPEG-4 container commonly used for audio, often encoded as AAC or Apple Lossless. Related extensions are used for audiobooks and protected audio."
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
          "An MPEG-4 media container based on the ISO Base Media File Format. It can hold video, audio, subtitles and metadata; the codecs determine how those streams are compressed."
      },
      {
        tag: "MOV",
        name: "QuickTime movie",
        extensions: [".mov", ".qt"],
        description:
          "Apple's QuickTime movie container. It organizes video, audio and other tracks in structures called atoms and can hold media encoded with a variety of codecs."
      },
      {
        tag: "AVI",
        name: "AVI video",
        extensions: [".avi"],
        description:
          "Microsoft's Audio Video Interleave container, based on RIFF. It stores audio and video streams with headers and indexing information; compression depends on the codecs used."
      },
      {
        tag: "MKV",
        name: "Matroska video",
        extensions: [".mkv", ".mka", ".mks", ".mk3d"],
        description:
          "Matroska, an extensible media container based on EBML. It can hold video, audio, subtitles, chapters and attachments; related extensions include .mka for audio and .mks for subtitles."
      },
      {
        tag: "WEBM",
        name: "WebM video",
        extensions: [".webm"],
        description:
          "A media container based on a restricted Matroska profile, designed for web playback. It uses specified video and audio codecs, including VP8 or VP9 video and Vorbis or Opus audio."
      },
      {
        tag: "ASF",
        name: "Windows Media",
        extensions: [".wma", ".wmv", ".asf"],
        description:
          "Microsoft's Advanced Systems Format, a container designed for digital media playback and streaming. Commonly used for Windows Media Audio and Windows Media Video files."
      },
      {
        tag: "MPEG-TS",
        name: "MPEG transport stream",
        extensions: [".ts", ".m2t", ".mpegts", ".tsv"],
        description:
          "An MPEG transport stream that carries audio, video and program information in packets, normally 188 bytes long. Used in broadcasting and streaming, with support for multiple programs."
      },
      {
        tag: "MPEG-PS",
        name: "MPEG program stream",
        extensions: [".mpg", ".mpeg", ".vob", ".m2p"],
        description:
          "An MPEG program stream that combines audio and video into a synchronized stream. Used for stored media, including DVD video in VOB files."
      },
      {
        tag: "M2TS",
        name: "Blu-ray / AVCHD transport stream",
        extensions: [".m2ts", ".mts"],
        description:
          "A transport-stream format used by Blu-ray and AVCHD. Each 192-byte unit adds a four-byte header with timing information to a standard 188-byte MPEG transport packet."
      },
      {
        tag: "H.264",
        name: "H.264 video stream",
        extensions: [".h264", ".264", ".avc"],
        description:
          "An elementary video stream encoded with H.264, also called AVC. It contains compressed video and codec information; audio and container-level metadata are stored separately."
      },
      {
        tag: "H.265",
        name: "H.265 video stream",
        extensions: [".h265", ".265", ".hevc"],
        description:
          "An elementary video stream encoded with H.265, also called HEVC. It contains compressed video and codec information and needs a separate container to package it with audio."
      },
      {
        tag: "MPEG-VIDEO",
        name: "MPEG video stream",
        extensions: [".m1v", ".m2v", ".mpv", ".mp2v"],
        description:
          "An elementary video stream encoded with MPEG-1 or MPEG-2. It contains video sequence information and compressed pictures, without the audio or multiplexing structure of a program or transport stream."
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
          "The binary packaging of glTF, used to deliver 3D scenes and models. It contains a JSON scene description and can embed geometry, animation data and images in a binary chunk."
      },
      {
        tag: "GLTF",
        name: "glTF model",
        extensions: [".gltf"],
        description:
          "A JSON-based format for delivering 3D scenes and models. It describes geometry, materials and animations, with binary data and images either embedded or referenced as external resources."
      },
      {
        tag: "OBJ",
        name: "Wavefront OBJ model",
        extensions: [".obj"],
        description:
          "A text-based 3D geometry format from Wavefront. It describes vertices, texture coordinates, normals and faces, and can reference a separate MTL file for materials."
      },
      {
        tag: "STL",
        name: "Stereolithography model",
        extensions: [".stl"],
        description:
          "A 3D surface format commonly used in 3D printing. It represents a model as triangles in ASCII or binary form, without a standard way to record units, textures or materials."
      },
      {
        tag: "PLY",
        name: "Polygon file format model",
        extensions: [".ply"],
        description:
          "The Polygon File Format, used for 3D meshes and point clouds. A text header defines elements and properties, such as vertex positions and colors, followed by ASCII or binary data."
      },
      {
        tag: "DAE",
        name: "COLLADA model",
        extensions: [".dae"],
        description:
          "A COLLADA document for exchanging 3D assets between applications. XML describes scene objects such as geometry, materials, cameras, lights and animations."
      },
      {
        tag: "FBX",
        name: "Autodesk FBX model",
        extensions: [".fbx"],
        description:
          "The binary form of Autodesk's format for exchanging 3D scenes and animation. It can store models, materials, skeletons, cameras and animation data."
      },
      {
        tag: "FBX-ASCII",
        name: "Autodesk FBX model (text)",
        extensions: [".fbx"],
        description:
          "The text form of Autodesk FBX. Named, nested records describe scene objects, geometry, properties, connections and animation data."
      },
      {
        tag: "3DS",
        name: "3D Studio model",
        extensions: [".3ds"],
        description:
          "A legacy 3D Studio scene format. Binary chunks store data such as meshes, materials, lights and cameras for exchange between 3D applications."
      },
      {
        tag: "BLEND",
        name: "Blender scene",
        extensions: [".blend"],
        description:
          "Blender's native project format. It stores scene data such as objects, meshes, materials and animation, and can pack resources such as textures into the file."
      },
      {
        tag: "USDA",
        name: "USD scene description (text)",
        extensions: [".usda", ".usd"],
        description:
          "The readable text form of Universal Scene Description (USD). It stores scene data and composition instructions used to assemble assets, properties and animation into a scene."
      },
      {
        tag: "USDC",
        name: "USD scene description (crate)",
        extensions: [".usdc", ".usd"],
        description:
          "The binary 'crate' form of Universal Scene Description (USD). It stores scene data and composition instructions in a layout designed for efficient storage and access."
      },
      {
        tag: "ABC",
        name: "Alembic scene cache (Ogawa)",
        extensions: [".abc"],
        description:
          "An Alembic scene cache using the Ogawa storage backend. It stores baked geometry and time-varying properties for transferring animated assets between production tools."
      },
      {
        tag: "STEP",
        name: "STEP exchange structure (Part 21)",
        extensions: [".step", ".stp", ".p21"],
        description:
          "A text exchange file using ISO 10303 Part 21 syntax. Commonly used to transfer CAD product data, including precise geometry and assemblies, according to a STEP application schema."
      },
      {
        tag: "IGES",
        name: "IGES exchange file",
        extensions: [".iges", ".igs"],
        description:
          "The Initial Graphics Exchange Specification, used to transfer CAD drawing and model data. It represents entities such as curves and surfaces in fixed-width text records."
      },
      {
        tag: "DXF",
        name: "AutoCAD drawing exchange file",
        extensions: [".dxf"],
        description:
          "Autodesk's Drawing Exchange Format for CAD data. Available in ASCII and binary forms, it uses group codes and values to describe drawing entities, layers and other properties."
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
          "A Unity archive for delivering assets such as models, textures and scenes at runtime. It contains serialized asset data and supporting resources, with optional compression."
      },
      {
        tag: "UNITY-WEB-DATA",
        name: "Unity WebGL data",
        extensions: [".data"],
        description:
          "A data container used by Unity WebGL builds. Its directory records the names and locations of the files packaged for the game."
      },
      {
        tag: "UNITY-SERIALIZED",
        name: "Unity serialized file",
        extensions: [".assets", ".unity"],
        description:
          "Unity's binary format for serialized objects and asset data. It records object metadata, properties and references and is used in built game data and AssetBundles."
      },
      {
        tag: "GODOT-CTEX",
        name: "Godot compressed texture",
        extensions: [".ctex"],
        description:
          "A Godot 4 imported texture. Its header describes dimensions and stored image data, which can use embedded image encoding or GPU texture compression."
      },
      {
        tag: "GODOT-RSCC",
        name: "Godot compressed file",
        extensions: [],
        description:
          "A file written through Godot's compressed file wrapper. A header and block table describe compressed data; the wrapper can be used for resources with different filenames."
      },
      {
        tag: "RPA",
        name: "Ren'Py archive",
        extensions: [".rpa"],
        description:
          "An archive used by Ren'Py games to package resources such as images, audio and scripts. An index maps resource names to the stored data."
      },
      {
        tag: "RENPY-RPC2",
        name: "Ren'Py compiled script",
        extensions: [".rpyc", ".rpymc"],
        description:
          "A compiled Ren'Py script using the RPC2 container. It stores compressed serialized script data that Ren'Py loads when running a visual novel."
      },
      {
        tag: "RPGMV-ASSET",
        name: "RPG Maker encrypted asset",
        extensions: [".rpgmvp", ".rpgmvo", ".rpgmvm", ".png_", ".ogg_", ".m4a_"],
        description:
          "An encrypted image or audio asset used by RPG Maker MV or MZ. A format header and partial encryption wrap the original media; interpreting the payload depends on the encryption key or recoverable file structure."
      }
    ]
  },
  {
    name: "Containers",
    formats: [
      {
        tag: "ISO-BMFF",
        name: "ISO base media container",
        extensions: [],
        description:
          "A box-based container underlying formats such as MP4 and HEIF. This identity is used when the structure is recognized without establishing a more specific supported format."
      },
      {
        tag: "RIFF",
        name: "RIFF container",
        extensions: [],
        description:
          "The Resource Interchange File Format, which organizes data into named chunks. This entry covers recognized RIFF structures outside specific formats such as WAVE, AVI and WebP."
      },
      {
        tag: "IFF",
        name: "IFF container",
        extensions: [],
        description:
          "The Interchange File Format, a chunk-based container with big-endian size fields. The engine can inspect its generic structure when no more specific supported form is identified."
      },
      {
        tag: "EBML",
        name: "EBML document",
        extensions: [],
        description:
          "Extensible Binary Meta Language, which stores nested elements with identifiers and lengths. This identity covers recognized EBML documents beyond the specific Matroska and WebM formats."
      }
    ]
  }
];

export const FORMAT_TOTAL = FORMAT_GROUPS.reduce((sum, group) => sum + group.formats.length, 0);

/**
 * Leading signatures, for the page's own probe.
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
