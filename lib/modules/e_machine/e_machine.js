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

ELF.prototype.module(function(){
    var machine = null,
        e_machine = ELF.prototype.getField('e_machine');
    switch(e_machine){
        case 1 :
            machine = "AT&T WE 32100";
            break;
        case 2 :
            machine = "SPARC";
            break;
        case 3 :
            machine = "Intel 80386";
            break;
        case 4 :
            machine = "Motorola 68000";
            break;
        case 5 :
            machine = "Motorola 88000";
            break;
        case 6 :
            machine = "Intel MCU";
            break;
        case 7 :
            machine = "Intel 80860";
            break;
        case 8 :
            machine = "MIPS I Architecture";
            break;
        case 9 :
            machine = "IBM System/370 Processor";
            break;
        case 10 :
            machine = "MIPS RS3000 Little-endian";
            break;
        case 15 :
            machine = "Hewlett-Packard PA-RISC";
            break;
        case 16 :
            machine = "Reserved for future use";
            break;
        case 17 :
            machine = "Fujitsu VPP500";
            break;
        case 18 :
            machine = "Enhanced instruction set SPARC";
            break;
        case 19 :
            machine = "Intel 80960";
            break;
        case 20 :
            machine = "PowerPC";
            break;
        case 21 :
            machine = "64-bit PowerPC";
            break;
        case 22 :
            machine = "IBM System/390 Processor";
            break;
        case 23 :
            machine = "IBM SPU/SPC";
            break;
        case 36 :
            machine = "NEC V800";
            break;
        case 37 :
            machine = "Fujitsu FR20";
            break;
        case 38 :
            machine = "TRW RH-32";
            break;
        case 39 :
            machine = "Motorola RCE";
            break;
        case 40 :
            machine = "ARM 32-bit architecture (AARCH32)";
            break;
        case 41 :
            machine = "Digital Alpha";
            break;
        case 42 :
            machine = "Hitachi SH";
            break;
        case 43 :
            machine = "SPARC Version 9";
            break;
        case 44 :
            machine = "Siemens TriCore embedded processor";
            break;
        case 45 :
            machine = "Argonaut RISC Core, Argonaut Technologies Inc.";
            break;
        case 46 :
            machine = "Hitachi H8/300";
            break;
        case 47 :
            machine = "Hitachi H8/300H";
            break;
        case 48 :
            machine = "Hitachi H8S";
            break;
        case 49 :
            machine = "Hitachi H8/500";
            break;
        case 50 :
            machine = "Intel IA-64 processor architecture";
            break;
        case 51 :
            machine = "Stanford MIPS-X";
            break;
        case 52 :
            machine = "Motorola ColdFire";
            break;
        case 53 :
            machine = "Motorola M68HC12";
            break;
        case 54 :
            machine = "Fujitsu MMA Multimedia Accelerator";
            break;
        case 55 :
            machine = "Siemens PCP";
            break;
        case 56 :
            machine = "Sony nCPU embedded RISC processor";
            break;
        case 57 :
            machine = "Denso NDR1 microprocessor";
            break;
        case 58 :
            machine = "Motorola Star*Core processor";
            break;
        case 59 :
            machine = "Toyota ME16 processor";
            break;
        case 60 :
            machine = "STMicroelectronics ST100 processor";
            break;
        case 61 :
            machine = "Advanced Logic Corp. TinyJ embedded processor family";
            break;
        case 62 :
            machine = "AMD x86-64 architecture";
            break;
        case 63 :
            machine = "Sony DSP Processor";
            break;
        case 64 :
            machine = "Digital Equipment Corp. PDP-10";
            break;
        case 65 :
            machine = "Digital Equipment Corp. PDP-11";
            break;
        case 66 :
            machine = "Siemens FX66 microcontroller";
            break;
        case 67 :
            machine = "STMicroelectronics ST9+ 8/16 bit microcontroller";
            break;
        case 68 :
            machine = "STMicroelectronics ST7 8-bit microcontroller";
            break;
        case 69 :
            machine = "Motorola MC68HC16 Microcontroller";
            break;
        case 70 :
            machine = "Motorola MC68HC11 Microcontroller";
            break;
        case 71 :
            machine = "Motorola MC68HC08 Microcontroller";
            break;
        case 72 :
            machine = "Motorola MC68HC05 Microcontroller";
            break;
        case 73 :
            machine = "Silicon Graphics SVx";
            break;
        case 74 :
            machine = "STMicroelectronics ST19 8-bit microcontroller";
            break;
        case 75 :
            machine = "Digital VAX";
            break;
        case 76 :
            machine = "Axis Communications 32-bit embedded processor";
            break;
        case 77 :
            machine = "Infineon Technologies 32-bit embedded processor";
            break;
        case 78 :
            machine = "Element 14 64-bit DSP Processor";
            break;
        case 79 :
            machine = "LSI Logic 16-bit DSP Processor";
            break;
        case 80 :
            machine = "Donald Knuth's educational 64-bit processor";
            break;
        case 81 :
            machine = "Harvard University machine-independent object files";
            break;
        case 82 :
            machine = "SiTera Prism";
            break;
        case 83 :
            machine = "Atmel AVR 8-bit microcontroller";
            break;
        case 84 :
            machine = "Fujitsu FR30";
            break;
        case 85 :
            machine = "Mitsubishi D10V";
            break;
        case 86 :
            machine = "Mitsubishi D30V";
            break;
        case 87 :
            machine = "NEC v850";
            break;
        case 88 :
            machine = "Mitsubishi M32R";
            break;
        case 89 :
            machine = "Matsushita MN10300";
            break;
        case 90 :
            machine = "Matsushita MN10200";
            break;
        case 91 :
            machine = "picoJava";
            break;
        case 92 :
            machine = "OpenRISC 32-bit embedded processor";
            break;
        case 93 :
            machine = "ARC International ARCompact processor (old spelling/synonym: EM_ARC_A5)";
            break;
        case 94 :
            machine = "Tensilica Xtensa Architecture";
            break;
        case 95 :
            machine = "Alphamosaic VideoCore processor";
            break;
        case 96 :
            machine = "Thompson Multimedia General Purpose Processor";
            break;
        case 97 :
            machine = "National Semiconductor 32000 series";
            break;
        case 98 :
            machine = "Tenor Network TPC processor";
            break;
        case 99 :
            machine = "Trebia SNP 1000 processor";
            break;
        case 100 :
            machine = "STMicroelectronics (www.st.com) ST200 microcontroller";
            break;
        case 101 :
            machine = "Ubicom IP2xxx microcontroller family";
            break;
        case 102 :
            machine = "MAX Processor";
            break;
        case 103 :
            machine = "National Semiconductor CompactRISC microprocessor";
            break;
        case 104 :
            machine = "Fujitsu F2MC16";
            break;
        case 105 :
            machine = "Texas Instruments embedded microcontroller msp430";
            break;
        case 106 :
            machine = "Analog Devices Blackfin (DSP) processor";
            break;
        case 107 :
            machine = "S1C33 Family of Seiko Epson processors";
            break;
        case 108 :
            machine = "Sharp embedded microprocessor";
            break;
        case 109 :
            machine = "Arca RISC Microprocessor";
            break;
        case 110 :
            machine = "Microprocessor series from PKU-Unity Ltd. and MPRC of Peking University";
            break;
        case 111 :
            machine = "eXcess: 16/32/64-bit configurable embedded CPU";
            break;
        case 112 :
            machine = "Icera Semiconductor Inc. Deep Execution Processor";
            break;
        case 113 :
            machine = "Altera Nios II soft-core processor";
            break;
        case 114 :
            machine = "National Semiconductor CompactRISC CRX microprocessor";
            break;
        case 115 :
            machine = "Motorola XGATE embedded processor";
            break;
        case 116 :
            machine = "Infineon C16x/XC16x processor";
            break;
        case 117 :
            machine = "Renesas M16C series microprocessors";
            break;
        case 118 :
            machine = "Microchip Technology dsPIC30F Digital Signal Controller";
            break;
        case 119 :
            machine = "Freescale Communication Engine RISC core";
            break;
        case 120 :
            machine = "Renesas M32C series microprocessors";
            break;
        case 131 :
            machine = "Altium TSK3000 core";
            break;
        case 132 :
            machine = "Freescale RS08 embedded processor";
            break;
        case 133 :
            machine = "Analog Devices SHARC family of 32-bit DSP processors";
            break;
        case 134 :
            machine = "Cyan Technology eCOG2 microprocessor";
            break;
        case 135 :
            machine = "Sunplus S+core7 RISC processor";
            break;
        case 136 :
            machine = "New Japan Radio (NJR) 24-bit DSP Processor";
            break;
        case 137 :
            machine = "Broadcom VideoCore III processor";
            break;
        case 138 :
            machine = "RISC processor for Lattice FPGA architecture";
            break;
        case 139 :
            machine = "Seiko Epson C17 family";
            break;
        case 140 :
            machine = "The Texas Instruments TMS320C6000 DSP family";
            break;
        case 141 :
            machine = "The Texas Instruments TMS320C2000 DSP family";
            break;
        case 142 :
            machine = "The Texas Instruments TMS320C55x DSP family";
            break;
        case 143 :
            machine = "Texas Instruments Application Specific RISC Processor, 32bit fetch";
            break;
        case 144 :
            machine = "Texas Instruments Programmable Realtime Unit";
            break;
        case 160 :
            machine = "STMicroelectronics 64bit VLIW Data Signal Processor";
            break;
        case 161 :
            machine = "Cypress M8C microprocessor";
            break;
        case 162 :
            machine = "Renesas R32C series microprocessors";
            break;
        case 163 :
            machine = "NXP Semiconductors TriMedia architecture family";
            break;
        case 164 :
            machine = "QUALCOMM DSP6 Processor";
            break;
        case 165 :
            machine = "Intel 8051 and variants";
            break;
        case 166 :
            machine = "STMicroelectronics STxP7x family of configurable and extensible RISC processors";
            break;
        case 167 :
            machine = "Andes Technology compact code size embedded RISC processor family";
            break;
        case 168 :
            machine = "Cyan Technology eCOG1X family";
            break;
        case 168 :
            machine = "Cyan Technology eCOG1X family";
            break;
        case 169 :
            machine = "Dallas Semiconductor MAXQ30 Core Micro-controllers";
            break;
        case 170 :
            machine = "New Japan Radio (NJR) 16-bit DSP Processor";
            break;
        case 171 :
            machine = "M2000 Reconfigurable RISC Microprocessor";
            break;
        case 172 :
            machine = "Cray Inc. NV2 vector architecture";
            break;
        case 173 :
            machine = "Renesas RX family";
            break;
        case 174 :
            machine = "Imagination Technologies META processor architecture";
            break;
        case 175 :
            machine = "MCST Elbrus general purpose hardware architecture";
            break;
        case 176 :
            machine = "Cyan Technology eCOG16 family";
            break;
        case 177 :
            machine = "National Semiconductor CompactRISC CR16 16-bit microprocessor";
            break;
        case 178 :
            machine = "Freescale Extended Time Processing Unit";
            break;
        case 179 :
            machine = "Infineon Technologies SLE9X core";
            break;
        case 180 :
            machine = "Intel L10M";
            break;
        case 181 :
            machine = "Intel K10M";
            break;
        case 182 :
            machine = "Reserved for future Intel use";
            break;
        case 183 :
            machine = "ARM 64-bit architecture (AARCH64)";
            break;
        case 184 :
            machine = "Reserved for future ARM use";
            break;
        case 185 :
            machine = "Atmel Corporation 32-bit microprocessor family";
            break;
        case 186 :
            machine = "STMicroeletronics STM8 8-bit microcontroller";
            break;
        case 187 :
            machine = "Tilera TILE64 multicore architecture family";
            break;
        case 188 :
            machine = "Tilera TILEPro multicore architecture family";
            break;
        case 189 :
            machine = "Xilinx MicroBlaze 32-bit RISC soft processor core";
            break;
        case 190 :
            machine = "NVIDIA CUDA architecture";
            break;
        case 191 :
            machine = "Tilera TILE-Gx multicore architecture family";
            break;
        case 192 :
            machine = "CloudShield architecture family";
            break;
        case 193 :
            machine = "KIPO-KAIST Core-A 1st generation processor family";
            break;
        case 194 :
            machine = "KIPO-KAIST Core-A 2nd generation processor family";
            break;
        case 195 :
            machine = "Synopsys ARCompact V2";
            break;
        case 196 :
            machine = "Open8 8-bit RISC soft processor core";
            break;
        case 197 :
            machine = "Renesas RL78 family";
            break;
        case 198 :
            machine = "Broadcom VideoCore V processor";
            break;
        case 199 :
            machine = "Renesas 78KOR family";
            break;
        case 200 :
            machine = "Freescale 56800EX Digital Signal Controller (DSC)";
            break;
        case 201 :
            machine = "Beyond BA1 CPU architecture";
            break;
        case 202 :
            machine = "Beyond BA2 CPU architecture";
            break;
        case 203 :
            machine = "XMOS xCORE processor family";
            break;
        case 204 :
            machine = "Microchip 8-bit PIC(r) family";
            break;
        case 205 :
            machine = "Reserved by Intel";
            break;
        case 206 :
            machine = "Reserved by Intel";
            break;
        case 207 :
            machine = "Reserved by Intel";
            break;
        case 208 :
            machine = "Reserved by Intel";
            break;
        case 209 :
            machine = "Reserved by Intel";
            break;
        case 210 :
            machine = "KM211 KM32 32-bit processor";
            break;
        case 211 :
            machine = "KM211 KMX32 32-bit processor";
            break;
        case 212 :
            machine = "KM211 KMX16 16-bit processor";
            break;
        case 213 :
            machine = "KM211 KMX8 8-bit processor";
            break;
        case 214 :
            machine = "KM211 KVARC processor";
            break;
        case 215 :
            machine = "Paneve CDP architecture family";
            break;
        case 216 :
            machine = "Cognitive Smart Memory Processor";
            break;
        case 217 :
            machine = "Bluechip Systems CoolEngine";
            break;
        case 218 :
            machine = "Nanoradio Optimized RISC";
            break;
        case 219 :
            machine = "CSR Kalimba architecture family";
            break;
        case 220 :
            machine = "Zilog Z80";
            break;
        case 221 :
            machine = "Controls and Data Services VISIUMcore processor";
            break;
        case 222 :
            machine = "FTDI Chip FT32 high performance 32-bit RISC architecture";
            break;
        case 223 :
            machine = "Moxie processor family";
            break;
        case 224 :
            machine = "AMD GPU architecture";
            break;
    }
    if(machine == null){
        if(e_machine >= 11 && em_machine <= 14 ){
            ELF.prototype.fields.machine = 'Reserved for future use';
            return;
        }
        if(e_machine >= 24 && em_machine <= 35 ){
            ELF.prototype.fields.machine = 'Reserved for future use';
            return;
        }
        if(e_machine >= 121 && em_machine <= 130 ){
            ELF.prototype.fields.machine = 'Reserved for future use';
            return;
        }
        if(e_machine >= 145 && em_machine <= 159 ){
            ELF.prototype.fields.machine = 'Reserved for future use';
            return;
        }
        if(e_machine >= 145 && em_machine <= 159 ){
            ELF.prototype.fields.machine = 'Reserved for future use';
            return;
        }
    }
    ELF.prototype.fields.machine = machine;
});
