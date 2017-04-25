section	.text
    global _start   ;must be declared for linker (ld)
_start:	            ;tells linker entry point
    mov	edx,len1    ;message length
    mov	ecx,msg1    ;message to write
    mov	ebx,1       ;file descriptor (stdout)
    mov	eax,4       ;system call number (sys_write)
    int	0x80        ;call kernel

    mov	edx,len2    ;message length
    mov	ecx,msg2    ;message to write
    mov	ebx,2       ;file descriptor (stderr)
    mov	eax,4       ;system call number (sys_write)
    int	0x80        ;call kernel

    mov	eax,1       ;system call number (sys_exit)
    int	0x80        ;call kernel

section	.data
    msg1 db 'Hello, world!', 0xa  ;string to be printed
    len1 equ $ - msg1     ;length of the string
    msg2 db 'I want to fuck this life :)', 0xa  ;string to be printed
    len2 equ $ - msg2     ;length of the string