switches = []
ranges = []
with open('e_machine.txt') as f:
    for line in f:
        line = line.strip().split("\t")
        if len(line) == 3:
            name, value, meaning = line
        else:
            name = 'reserved'
            meaning = ''
            value = ''
        if not name == 'reserved':
            if '-' not in value:
                switches.append((value, meaning))
            else:
                start, end = value.split('-')
                ranges.append((start, end, meaning))

print "\n".join(["/*****************************************************************************",
"*   This program is free software: you can redistribute it and/or modify    *",
"*   it under the terms of the GNU General Public License as published by    *",
"*   the Free Software Foundation, either version 3 of the License, or       *",
"*   (at your option) any later version.                                     *",
"*___________________________________________________________________________*",
"*   This program is distributed in the hope that it will be useful,         *",
"*   but WITHOUT ANY WARRANTY; without even the implied warranty of          *",
"*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           *",
"*   GNU General Public License for more details.                            *",
"*___________________________________________________________________________*",
"*   You should have received a copy of the GNU General Public License       *",
"*   along with this program.  If not, see <http://www.gnu.org/licenses/>.   *",
"*___________________________________________________________________________*",
"*                             Created by  Qti3e                             *",
"*        <http://Qti3e.Github.io>    LO-VE    <Qti3eQti3e@Gmail.com>        *",
"*****************************************************************************/",
"",
"ELF.prototype.module(function(){",
"    var machine = null,",
"        e_machine = ELF.prototype.getField('e_machine');",
"    switch(e_machine){"])

for case, machine in switches:
    print "        case {0}:".format(case)
    print '            machine = "{0}";'.format(machine)
    print "            break;".format(machine)
print "    }"
print "    if(machine == null){"
for start, end, machine in ranges:
    print "        if(e_machine >= "+start+" && em_machine <= "+end+"){"
    print "            ELF.prototype.fields.machine = '{0}';".format(machine)
    print "            return;"
    print "        }"
print "    }"
print "    ELF.prototype.fields.machine = machine;"
print "});"
