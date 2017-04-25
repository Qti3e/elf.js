/*****************************************************************************
 *   This program is free software: you can redistribute it and/or modify    *
 *   it under the terms of the GNU General Public License as published by    *
 *   the Free Software Foundation, either version 3 of the License, or       *
 *   (at your option) any later version.                                     *
 *___________________________________________________________________________*
 *   This program is distributed in the hope that it will be useful,         *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           *
 *   GNU General Public License for more details.                            *
 *___________________________________________________________________________*
 *   You should have received a copy of the GNU General Public License       *
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.   *
 *___________________________________________________________________________*
 *                             Created by  Qti3e                             *
 *        <http://Qti3e.Github.io>    LO-VE    <Qti3eQti3e@Gmail.com>        *
 *****************************************************************************/

/**
 * @param bin
 *  Binary of your elf file
 * @constructor
 */
function ELF(bin){
    this.bin = bin;
    if(!this.checkMagicId()){
        throw 'Invalid elf file.';
    }
    this.parse();
    this.parsePrograms();
    this.parseSections();
    this.resolveSection();
    this.afterParse();
}

/**
 * ELF nop function (NOP stands for No Operation)
 * @constructor
 */
ELF.prototype.NOP   = function(){};

/**
 * Check if file is really in ELF format or not
 * @returns {boolean}
 */
ELF.prototype.checkMagicId = function(){
    return this.bin.slice(0,4) == '\x7FELF';
};

// Header fields array
ELF.prototype.fields = {};
/**
 * Return ELF header fields
 * @param name
 * @param def
 * @returns {*}
 */
ELF.prototype.getField = function(name, def){
    if(def == undefined)
        def = false;
    if(this.fields[name] == undefined)
        return def;
    return this.fields[name]
};
/**
 * ELFDATA2MSB encoding (Read data right to left)
 * @return {Number}
 */
ELF.prototype.readUIntMSB   = function(offset, size){
    var str = this.bin.slice(offset, offset + size);
    var re = '';
    for(var i = 0;i < size;i++){
        re += str[i].toString(16);
    }
    return parseInt(re, 16);
};

/**
 * ELFDATA2LSB encoding (Read data left to right)
 * @param offset
 * @param size
 * @return {Number}
 */
ELF.prototype.readUIIntLSB  = function (offset, size) {
    var str = this.bin.slice(offset, offset + size);
    var re = '';
    for(var i = size - 1;i >= 0;i--){
        re += str[i].toString(16);
    }
    return parseInt(re, 16);
};

/**
 * Read data as integer from file
 * @param offset
 * @param size  in byte
 * @return number
 */
ELF.prototype.readUInt      = function(offset, size){
    if(this.endian == 'lsb')
        return this.readUIIntLSB(offset, size);
    return this.readUIntMSB(offset, size);
};

/**
 * Read 8 bit from file
 * @param offset
 * @return {number}
 */
ELF.prototype.readUInt8     = function (offset) {
    return this.bin[offset];
};

/**
 * Read 16 bit from file
 * @param offset
 * @return {number}
 */
ELF.prototype.readUInt16    = function (offset) {
    return this.readUInt(offset, 2);
};

/**
 * Read 32 bit from file
 * @param offset
 * @return {number}
 */
ELF.prototype.readUInt32    = function (offset) {
    return this.readUInt(offset, 4);
};

/**
 * Read 64 bit from file
 * @param offset
 * @return {number}
 */
ELF.prototype.readUInt64    = function (offset) {
    return this.readUInt(offset, 8);
};

/**
 * Parse ELF headers and save the fields
 */
ELF.prototype.parse = function (){
    this.fields.EI_CLASS    = this.readUInt8(4);
    this.fields.EI_DATA     = this.readUInt8(5);
    if(this.fields.EI_DATA == 1){
        this.endian = 'lsb'
    }else if(this.fields.EI_DATA == 2){
        this.endian = 'msb';
    }else {
        throw new Error('Invalid file encoding.')
    }
    this.fields.EI_VERSION  = this.readUInt8(6);
    this.fields.EI_OSABI    = this.readUInt8(7);
    switch(this.fields.EI_OSABI){
        // case 0:
        //     this.fields.os  = 'System V';
        //     break;
        case 1:
            this.fields.os  = 'HP-UX';
            break;
        case 2:
            this.fields.os  = 'NetBSD';
            break;
        case 3:
            this.fields.os  = 'Linux';
            break;
        case 6:
            this.fields.os  = 'Sun Solaris';
            break;
        case 7:
            this.fields.os  = 'AIX';
            break;
        case 8:
            this.fields.os  = 'IRIX';
            break;
        case 9:
            this.fields.os  = 'FreeBSD';
            break;
        case 10:
            this.fields.os  = 'Compaq TRU64 UNIX';
            break;
        case 11:
            this.fields.os  = 'Novell Modesto';
            break;
        case 12:
            this.fields.os  = 'Open BSD';
            break;
        case 13:
            this.fields.os  = 'Open VMS';
            break;
        case 14:
            this.fields.os  = 'HP-NonStop Kernel';
            break;
        case 15:
            this.fields.os  = 'Amiga Research OS';
            break;
        case 16:
            this.fields.os  = 'FenixOS';
            break;
        case 17:
            this.fields.os  = 'Nuxi CloudABI';
            break;
        case 18:
            this.fields.os  = 'Stratus Technologies OpenVOS';
            break;
        default:
            this.fields.os  = undefined;
    }
    this.fields.EI_ABIVERSION   = this.readUInt8(8);
    this.fields.e_type      = this.readUInt16(0x10);
    switch(this.fields.e_type){
        case 1:
            this.fields.e_type_string   = 'relocatable';
            break;
        case 2:
            this.fields.e_type_string   = 'executable';
            break;
        case 3:
            this.fields.e_type_string   = 'shared';
            break;
        case 4:
            this.fields.e_type_string   = 'core';
            break;
    }
    this.fields.e_machine   = this.readUInt16(0x12);
    this.fields.e_version   = this.readUInt32(0x14);
    var offset  = 0;
    if(this.fileFormat() == 32){
        this.fields.e_entry = this.readUInt32(0x18);
        this.fields.e_phoff = this.readUInt32(0x1c);
        this.fields.e_shoff = this.readUInt32(0x20);
    }else if(this.fileFormat() == 64){
        offset  = 12;
        this.fields.e_entry = this.readUInt64(0x18);
        this.fields.e_phoff = this.readUInt64(0x20);
        this.fields.e_shoff = this.readUInt64(0x28);
    }else {
        throw new Error('Unsupported file format.')
    }
    this.fields.e_flags     = this.readUInt32(0x24 + offset);
    this.fields.e_ehsize    = this.readUInt16(0x28 + offset);
    this.fields.e_phentsize = this.readUInt16(0x2a + offset);
    this.fields.e_phnum     = this.readUInt16(0x2c + offset);
    this.fields.e_shentsize = this.readUInt16(0x2e + offset);
    this.fields.e_shnum     = this.readUInt16(0x30 + offset);
    this.fields.e_shstrndx  = this.readUInt16(0x32 + offset);
};

ELF.prototype.sliceChunks   = function (offset, count, size) {
    var end     = offset + count * size;
    if(end > this.bin.length)
        throw new Error('Failed to slick chunks.');
    var chunks  = [];
    for(;offset < end;offset += size)
        chunks.push(offset)
    return chunks
};

/**
 * Parse program flags
 * @param value
 * @param map
 * @return {{}}
 */
ELF.prototype.mapFlags      = function(value, map){
    var res = {};
    for (var bit = 1; (value < 0 || bit <= value) && bit !== 0; bit <<= 1)
        if(value & bit)
            res[map[bit] || bit] = true;
    return res
};

/**
 * Store all programs of the elf file
 * @type {Array}
 */
ELF.prototype.programs      = [];

/**
 * Constant of program types
 * @type {{0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 0x6464e550: string, 0x6474e550: string, 0x6474e551: string, 0x6474e552: string, 0x6ffffffa: string, 0x6ffffffb: string, 0x6ffffffc: string, 0x6ffffffd: string}}
 */
ELF.prototype.types         = {
    0: 'null',
    1: 'load',
    2: 'dynamic',
    3: 'interp',
    4: 'note',
    5: 'shlib',
    6: 'phdr',
    7: 'tls',
    0x6464e550: 'sunw_unwind',
    0x6474e550: 'sunw_eh_frame',
    0x6474e551: 'gnu_stack',
    0x6474e552: 'gnu_relro',
    0x6ffffffa: 'sunwbss',
    0x6ffffffb: 'sunwstack',
    0x6ffffffc: 'sunwdtrace',
    0x6ffffffd: 'sunwcap'
};

/**
 * Parse program headers and slice the program data
 * @param offset
 *  The offset where program data started
 */
ELF.prototype.parseProgram  = function(offset){
    var re      = {};
    re.p_type   = this.types[this.readUInt32(offset)];
    if(this.fileFormat() == 32){
        re.p_offset = this.readUInt32(offset + 4);
        re.p_vadder = this.readUInt32(offset + 8);
        re.p_paddr  = this.readUInt32(offset + 12);
        re.p_filez  = this.readUInt32(offset + 16);
        re.p_memsz  = this.readUInt32(offset + 20);
        re.p_flags  = this.readUInt32(offset + 24);
        re.p_align  = this.readUInt32(offset + 28);
    } else{
        re.p_flags  = this.readUInt32(offset + 4);
        re.p_offset = this.readUInt64(offset + 8);
        re.p_vadder = this.readUInt64(offset + 16);
        re.p_paddr  = this.readUInt64(offset + 24);
        re.p_filez  = this.readUInt64(offset + 32);
        re.p_memsz  = this.readUInt64(offset + 40);
        re.p_align  = this.readUInt64(offset + 48);
    }
    re.p_flags  = this.mapFlags(re.p_filez,{
        4: 'r',
        2: 'w',
        1: 'x',
        0x00100000: 'sunw_failure',
        0x00200000: 'sunw_killed',
        0x00400000: 'sunw_siginfo'
    });
    re.data = this.bin.slice(re.p_offset, re.p_offset + re.p_filez);
    this.programs.push(re);
};

/**
 * Chunk programs and parse them with parseProgram function
 * @return {Array}
 */
ELF.prototype.parsePrograms = function () {
    if(this.fields.e_phoff === 0 || this.fields.e_phnum === 0)
        return [];
    var programs    = this.sliceChunks(this.fields.e_phoff, this.fields.e_phnum, this.fields.e_phentsize);
    programs.map(function(offset){
        this.parseProgram(offset);
    }, this);
};

/**
 * Section types
 * @type {{0: string, 0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string, 12: string, 13: string, 14: string, 15: string, 16: string, 17: string, 18: string, 19: string, 0x60000000: string, 0x6fffffef: string, 0x6ffffff0: string, 0x6ffffff1: string, 0x6ffffff2: string, 0x6ffffff3: string, 0x6ffffff4: string, 0x6ffffff5: string, 0x6ffffff6: string, 0x6ffffff7: string, 0x6ffffff8: string, 0x6ffffff9: string, 0x6ffffffa: string, 0x6ffffffb: string, 0x6ffffffc: string, 0x6ffffffd: string, 0x6ffffffe: string, 0x6fffffff: string, 0x6fffffff: string, 0x6fffffff: string, 0x6ffffff5: string, 0x6ffffff6: string, 0x6ffffff7: string, 0x6ffffff8: string}}
 */
ELF.prototype.sectType  = {
    0: undefined,
    1: 'progbits',
    2: 'symtab',
    3: 'strtab',
    4: 'rela',
    5: 'hash',
    6: 'dynamic',
    7: 'note',
    8: 'nobits',
    9: 'rel',
    10: 'shlib',
    11: 'dynsym',
    12: 'unknown12',
    13: 'unknown13',
    14: 'init_array',
    15: 'fini_array',
    16: 'preinit_array',
    17: 'group',
    18: 'symtab_shndx',
    19: 'num',
    0x60000000: 'loos',
    0x6fffffef: 'sunw_capchain',
    0x6ffffff0: 'sunw_capinfo',
    0x6ffffff1: 'sunw_symsort',
    0x6ffffff2: 'sunw_tlssort',
    0x6ffffff3: 'sunw_ldynsym',
    0x6ffffff4: 'sunw_dof',
    0x6ffffff9: 'sunw_debug',
    0x6ffffffa: 'sunw_move',
    0x6ffffffb: 'sunw_comdat',
    0x6ffffffc: 'sunw_syminfo',
    0x6ffffffd: 'sunw_verdef',
    0x6ffffffe: 'sunw_verneed',
    0x6fffffff: 'hios',
    0x6ffffff5: 'gnu_attributes',
    0x6ffffff6: 'gnu_hash',
    0x6ffffff7: 'gnu_liblist',
    0x6ffffff8: 'checksum'
};

ELF.prototype.sectFlags = {
    0x01: 'write',
    0x02: 'alloc',
    0x04: 'execinstr',
    0x10: 'merge',
    0x20: 'strings',
    0x40: 'info_link',
    0x80: 'link_order',
    0x100: 'os_nonconforming',
    0x200: 'group',
    0x400: 'tls'
};

/**
 * Store sections
 * @type {Array}
 */
ELF.prototype.sections  = [];

/**
 * Chunk sections and send them to the parseSection function
 */
ELF.prototype.parseSections = function(){
    if(this.fields.e_shoff === 0 || this.fields.e_shnum === 0)
        return [];

    var sections    = this.sliceChunks(this.fields.e_shoff, this.fields.e_shnum, this.fields.e_shentsize);
    sections.map(function (offset) {
        this.parseSection(offset);
    }, this)
};

/**
 * Parse program section and save them into the right place asa we expect.
 * @param offset
 */
ELF.prototype.parseSection  = function (offset) {
    var section     = {};
    section.name    = this.readUInt32(offset);
    section.type    = this.readUInt32(offset + 4);
    if(this.fileFormat() == 32){
        section.flags   = this.readUInt32(offset + 8);
        section.addr    = this.readUInt32(offset + 12);
        section.off     = this.readUInt32(offset + 16);
        section.size    = this.readUInt32(offset + 20);
        section.link    = this.readUInt32(offset + 24);
        section.info    = this.readUInt32(offset + 28);
        section.addralign   = this.readUInt32(offset + 32);
        section.entsize = this.readUInt32(offset + 36);
    }else {
        section.flags   = this.readUInt64(offset + 8);
        section.addr    = this.readUInt64(offset + 16);
        section.off     = this.readUInt64(offset + 24);
        section.size    = this.readUInt64(offset + 32);
        section.link    = this.readUInt32(offset + 40);
        section.info    = this.readUInt32(offset + 44);
        section.addralign   = this.readUInt64(offset + 56);
        section.entsize = this.readUInt64(offset + 54);
    }
    section.data        = this.bin.slice(section.off, section.off + section.size);
    section.type        = this.sectType[section.type] || section.type;
    section.flags       = this.mapFlags(section.flags, this.sectFlags);
    this.sections.push(section);
};

ELF.prototype.resolveStr        = function(strtab, offset){
    for(var i = offset; i < strtab.length && strtab[i] !== 0; i++){}
    return strtab.slice(offset, i).toString();
};

ELF.prototype.resolveSection    = function(){
    var strtab  = this.sections[this.fields.e_shstrndx];
    var sections    = {};
    this.sections.map(function(section){
        section.name    = this.resolveStr(strtab.data, section.name);
        sections[section.name]  = section;
    }, this);
    this.sections   = sections;
};

/**
 * Return 32-bit or 64-bit format
 * @returns {number}
 */
ELF.prototype.fileFormat = function(){
    var EI_CLASS = this.getField('EI_CLASS', 1);
    return 32 * EI_CLASS;
};

/**
 * Assembler Opcode Table
 * Each opcode has some sub-members listed here:
 *  byte:   The array key (Something like function name in Machine Language), note: the number is in decimal
 *      Example:    0xBA
 *  name:   The opcode name, actually we do not need this but we give it so we can write a help function in next steps
 *      Example:    mov eDX, lv
 *  description:    A little description about the opcode
 *      Example:    Assembly mov function
 *  requiredBytes:  It tells how many bytes after opcode name should send to the code function as input
 *      Example:    4-Bytes in 32-bit file format and 8-Bytes in 64-bit.
 *  code:   Translation function
 *      Example:    function(inp){...}
 * @type {{}}
 */
ELF.prototype.opcodes = {};

/**
 *  Register an opcode
 * @param byte
 * @param code
 * @param requiredBytes
 * @param name
 * @param description
 * @returns {{name: *, bytes: *, code: *, description: *}}
 */
ELF.prototype.opcode  = function(byte,code,requiredBytes,name,description){
    if(requiredBytes == undefined)
        requiredBytes = this.fileFormat() / 8;
    if(code == undefined)
        code = this.NOP;
    return ELF.prototype.opcodes[byte] = {
        name: name,
        bytes: requiredBytes,
        code: code,
        description: description
    };
};

/**
 * Store syscall api
 * @type {{}}
 */
ELF.prototype.sysAPIs   = {};

/**
 * Register a new system call
 * @param eax
 * @param code
 * @param name
 */
ELF.prototype.sysAPI    = function (eax, code, name) {
    this.sysAPIs[eax]   = {
        code: code,
        name: name
    };
};
/**
 * ELF.js registered modules, they will execute after parsing the headers
 * @type {Array}
 */
ELF.prototype.modules   = [];

/**
 * Register a new module to ELF.js
 * @param method
 */
ELF.prototype.module    = function (method) {
    this.modules.push(method);
};

/**
 * Execute modules, after parsing the headers
 */
ELF.prototype.afterParse    = function(){
    this.modules.forEach(function (method) {
        method();
    });
};

var elf = exports;
elf.Create = function(name){
    return new ELF(name);
};
