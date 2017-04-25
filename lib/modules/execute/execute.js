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

ELF.prototype.execute   = function () {
    var code = this.sections['.text'].data;
    this.runSection(code);
};

ELF.prototype.runSection    = function (section) {
    var pointer = 0,
        opcode, iv, re;
    while(pointer < section.length){
        opcode  = this.opcodes[section[pointer]];
        iv  = section.slice(pointer + 1, pointer + opcode.bytes + 1);
        re = opcode.code(iv, this);
        pointer += opcode.bytes + 1;
        if(typeof(re) == 'object'){
            if(re.pointer !== undefined){
                pointer = re.pointer;
            }
        }
    }
};
