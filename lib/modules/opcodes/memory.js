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
 * Right now ELF.js supports only X86 memory
 * @type {{a0: string, ah: string, al: string, b0: string, bh: string, bl: string, c0: string, ch: string, cl: string, d0: string, dh: string, dl: string}}
 */
ELF.prototype.memory    = {
    //eAX
    a0:'\x00\x00',
    ah:'\x00',
    al:'\x00',

    //eBX
    b0:'\x00\x00',
    bh:'\x00',
    bl:'\x00',

    //eCX
    c0:'\x00\x00',
    ch:'\x00',
    cl:'\x00',

    //eDX
    d0:'\x00\x00',
    dh:'\x00',
    dl:'\x00'
};

//eAX managing section
ELF.prototype.memory.getEAX = function(){
    return this.a0 + this.ah + this.al;
};

ELF.prototype.memory.setEAX = function(inp){
    if(inp.length !== 4)
        return;
    this.a0  = inp.slice(0,2);
    this.ah  = inp[2];
    this.al  = inp[3];
};

ELF.prototype.memory.setAH  = function(ah){
    if(ah.length !== 1)
        return;
    this.ah = ah
};

ELF.prototype.memory.setAL  = function(al){
    if(al.length !== 1)
        return;
    this.al = al
};


//eBX managing section
ELF.prototype.memory.getEBX = function(){
    return this.b0 + this.bh + this.bl;
};

ELF.prototype.memory.setEBX = function(inp){
    if(inp.length !== 4)
        return;
    this.b0  = inp.slice(0,2);
    this.bh  = inp[2];
    this.bl  = inp[3];
};


ELF.prototype.memory.setBH  = function(bh){
    if(bh.length !== 1)
        return;
    this.bh = bh
};

ELF.prototype.memory.setBL  = function(bl){
    if(bl.length !== 1)
        return;
    this.bl = bl
};

//eCX managing section
ELF.prototype.memory.getECX = function(){
    return this.c0 + this.ch + this.cl;
};

ELF.prototype.memory.setECX = function(inp){
    if(inp.length !== 4)
        return;
    this.c0  = inp.slice(0,2);
    this.ch  = inp[2];
    this.cl  = inp[3];
};


ELF.prototype.memory.setCH  = function(ch){
    if(ch.length !== 1)
        return;
    this.ch = ch
};

ELF.prototype.memory.setCL  = function(cl){
    if(cl.length !== 1)
        return;
    this.cl = cl
};


//eDX managing section
ELF.prototype.memory.getEDX = function(){
    return this.d0 + this.dh + this.dl;
};

ELF.prototype.memory.setEDX = function(inp){
    if(inp.length !== 4)
        return;
    this.d0  = inp.slice(0,2);
    this.dh  = inp[2];
    this.dl  = inp[3];
};


ELF.prototype.memory.setDH  = function(dh){
    if(dh.length !== 1)
        return;
    this.dh = dh
};

ELF.prototype.memory.setDL  = function(dl){
    if(dl.length !== 1)
        return;
    this.dl = dl
};
