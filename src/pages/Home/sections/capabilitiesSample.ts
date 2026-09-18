/**
 * The same bytes, seen five ways.
 *
 * This is sample output standing in for the real thing. The application can
 * export exactly these artifacts from its Export tab — tree, details, readable,
 * patterns, raw, disassembly — so when there is a file we are happy to show in
 * public, this file gets replaced with its actual export and nothing else
 * changes.
 *
 * The hex is a genuine PE DOS header and stub. The instructions are real x86
 * encodings. The pattern values are deliberately unreachable examples rather
 * than anything that could be mistaken for a live indicator.
 */

export type PatternRow = { type: string; value: string; offset: string };
export type InstructionRow = { address: string; bytes: string; text: string };

export const SAMPLE_FILE = "installer.exe";
export const SAMPLE_SUMMARY = "PE32 executable (x86) · 199 files in 11 folders";

/** Rendered content, as the Display tab would show it. */
export const DISPLAY = [
  "Windows GUI application, Inno Setup",
  "Linker 2.25 · entry point 0x000B5EEC · image base 0x00400000",
  "Signed · 1 certificate · 4.1 MB (4,292,529 bytes)"
];

/** Human-readable strings pulled out of the bytes. */
export const READABLE = [
  "!This program cannot be run in DOS mode.",
  "KERNEL32.dll",
  "GetProcAddress",
  "LoadLibraryA",
  "VirtualAlloc",
  "InnoSetupLdrWindow",
  "Inno Setup Setup Data (5.5.9)",
  "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
  "The setup files are corrupted. Please obtain a new copy of the program."
];

/** Raw bytes, sixteen to the line, as the Raw tab lays them out. */
export const RAW = [
  "00000000  4d 5a 90 00 03 00 00 00  04 00 00 00 ff ff 00 00  MZ..............",
  "00000010  b8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  ........@.......",
  "00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................",
  "00000030  00 00 00 00 00 00 00 00  00 00 00 00 f0 00 00 00  ................",
  "00000040  0e 1f ba 0e 00 b4 09 cd  21 b8 01 4c cd 21 54 68  ........!..L.!Th",
  "00000050  69 73 20 70 72 6f 67 72  61 6d 20 63 61 6e 6e 6f  is program canno",
  "00000060  74 20 62 65 20 72 75 6e  20 69 6e 20 44 4f 53 20  t be run in DOS ",
  "00000070  6d 6f 64 65 2e 0d 0d 0a  24 00 00 00 00 00 00 00  mode....$......."
];

/** Everything the pattern pass recognised, with where it sits. */
export const PATTERNS: PatternRow[] = [
  { type: "Registry path", value: "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", offset: "0x0004a2c0" },
  { type: "File path", value: "C:\\Program Files\\Example\\app.exe", offset: "0x0004a31c" },
  { type: "URL", value: "https://updates.example.invalid/check", offset: "0x0004a118" },
  { type: "Domain", value: "updates.example.invalid", offset: "0x0004a120" },
  { type: "Version", value: "5.5.9", offset: "0x0004a0f4" },
  { type: "Command", value: "cmd.exe /c del", offset: "0x0004a3a8" }
];

/** Decoded machine instructions, as the Disassembly tab lists them. */
export const DISASSEMBLY: InstructionRow[] = [
  { address: "00401000", bytes: "55", text: "push    ebp" },
  { address: "00401001", bytes: "8b ec", text: "mov     ebp, esp" },
  { address: "00401003", bytes: "83 ec 20", text: "sub     esp, 0x20" },
  { address: "00401006", bytes: "53", text: "push    ebx" },
  { address: "00401007", bytes: "56", text: "push    esi" },
  { address: "00401008", bytes: "57", text: "push    edi" },
  { address: "00401009", bytes: "8b 75 08", text: "mov     esi, dword ptr [ebp + 8]" },
  { address: "0040100c", bytes: "85 f6", text: "test    esi, esi" },
  { address: "0040100e", bytes: "74 12", text: "je      0x401022" },
  { address: "00401010", bytes: "ff 15 e8 23 4c 00", text: "call    dword ptr [0x4c23e8]" },
  { address: "00401016", bytes: "8b d8", text: "mov     ebx, eax" },
  { address: "00401018", bytes: "5f", text: "pop     edi" },
  { address: "00401019", bytes: "5e", text: "pop     esi" },
  { address: "0040101a", bytes: "5b", text: "pop     ebx" },
  { address: "0040101b", bytes: "8b e5", text: "mov     esp, ebp" },
  { address: "0040101d", bytes: "5d", text: "pop     ebp" },
  { address: "0040101e", bytes: "c3", text: "ret" }
];
