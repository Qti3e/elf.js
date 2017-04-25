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
 * Create the local storage object
 * @type {{}}
 */
ELF.prototype.FileSystem    = {};


/**
 * The storage management object
 */
ELF.prototype.FileSystem.storage    = {
    /**
     * Check if ELF.js runs on the browser or node.js
     * If it runs on the browser so we can use localStorage as our data storage
     * @type {boolean}
     */
    useLC: typeof(localStorage) !== 'undefined',
    isNode: typeof module !== 'undefined' && module.exports,
    // Save files in this object if we don't have access to local storage
    files: {},
    // Save links
    links:{
        id2name:{},
        name2id:{},
        last_id:2
    },
    id2name: function(id){
        if(id < 3){
            if(id == 0)
                return 'sys/stdin';
            if(id == 1)
                return 'sys/stdout';
            if(id == 2)
                return 'sys/stderr';
        }
        if(this.useLC){
            return localStorage.getItem('elf-i2n_' + id);
        }else {
            return this.links.id2name[id];
        }
    },
    name2id:function(name){
        if(name === 'sys/stdin')
            return 0;
        if(name == 'sys/stdout')
            return 1;
        if(name == 'sys/stderr')
            return 2;
        if(this.useLC){
            return localStorage.getItem('elf-n2i_' + name);
        }else {
            return this.links.name2id[name];
        }
    },
    fileExists: function (file_name) {
        if(this.useLC){
            return localStorage.getItem('elf-n2i_' + name) !== undefined;
        }else {
            return this.links.name2id[file_name] !== undefined;
        }
    },
    fileWrite: function(file_id, data){
        if(file_id == 1){
            if(this.isNode)
                process.stdout.write(data);
            else
                console.log(data)
        }
        if(file_id == 2){
            if(this.isNode)
                process.stderr.write(data);
            else
                console.error(data);
        }
        if(this.useLC){
            localStorage.setItem('file_' + file_id, data);
        }else {
            this.files[file_id] = data;
        }
    },
    readFile: function(file_id){
        if(file_id == 0){
            //todo js read line
            return '';
        }
        if(this.useLC){
            return localStorage.getItem('file_'+file_id);
        }else {
            return this.files[file_id];
        }
    },
    createFile: function(filename){
        var re;
        if(this.useLC){
            re = localStorage.getItem('elf-n2i_' + filename);
            if(re == undefined){
                if (localStorage.getItem('last_id') == undefined)
                    localStorage.setItem('last_id', 2);
                re = localStorage.getItem('last_id') + 1;
                localStorage.setItem('last_id', re);
                localStorage.setItem('elf-n2i_' + filename, re);
                localStorage.setItem('elf-i2n_' + re, filename)
            }
            return re;
        }else {
            re = ++this.links.last_id;
            this.links.name2id[filename]    = re;
            this.links.id2name[re]          = filename;
            return re;
        }
    },
    listFiles: function(){
        //todo write it when I fell good
    }
};
ELF.prototype.FileSystem.create = function(filename){
    return this.storage.createFile(filename);
};
ELF.prototype.FileSystem.write  = function(file_id, data){
    return this.storage.fileWrite(file_id, data);
};
ELF.prototype.FileSystem.open   = function(file_id){
    // return
};
// ELF.prototype.FileSystem.

