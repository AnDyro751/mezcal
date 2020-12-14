import {useState, useEffect} from 'react';

export default function ReviewsStarItem({defaultUsed = false, editable = false, handleMouseEnter, index}) {
    const [used, setUsed] = useState(defaultUsed);
    useEffect(() => {
        setUsed(defaultUsed)
    }, [defaultUsed])
    return (
        <div className="w-auto"
             onMouseEnter={() => {
                 if (editable) {
                     setUsed(true);
                     handleMouseEnter(index)
                     console.log("ENTER")
                 }
             }}
             onMouseLeave={() => {
                 if (editable) {
                     setUsed(false)
                 }
             }}
        >
            {
                used ?
                    <img alt="svgImg"
                         src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjYiIGhlaWdodD0iMjYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iIGZpbGw9IiNmMWM0MGYiPjxwYXRoIGQ9Ik0xNjcuNTI5NDUsNjcuMDU4MjljLTAuNzQ5NCwtMi4zNzc0IC0yLjg0MjU1LC00LjEzNDYyIC01LjMyMzMyLC00LjQ5NjRsLTQ4LjU1NTg4LC03LjA1NDY5bC0yMS43MzI1OCwtNDQuMDA3ODFjLTIuMjIyMzUsLTQuNDk2MzkgLTkuNjEyOTgsLTQuNDk2MzkgLTExLjg2MTE3LDBsLTIxLjcwNjczLDQ0LjAwNzgxbC00OC41NTU4OSw3LjA1NDY5Yy0yLjQ4MDc3LDAuMzYxNzggLTQuNTczOTIsMi4wOTMxNSAtNS4zNDkxNiw0LjQ5NjRjLTAuNzc1MjQsMi40MDMyNCAtMC4xMjkyMSw1LjAzOTA2IDEuNjc5NjksNi43NzA0M2wzNS4xNDQyMywzNC4yNjU2M2wtOC4yOTUwNyw0OC4zNDkxNmMtMC40MTM0NiwyLjQ4MDc3IDAuNTk0MzUsNS4wMTMyMiAyLjYzNTgyLDYuNDg2MTdjMi4wNDE0NiwxLjQ3Mjk2IDQuNzI4OTYsMS42Nzk2OSA2Ljk1MTMyLDAuNDkwOTlsNDMuNDM5MywtMjIuODE3OTFsNDMuNDEzNDYsMjIuODE3OTFjMC45ODE5NywwLjUxNjgzIDIuMDQxNDcsMC43NDk0IDMuMTAwOTYsMC43NDk0YzEuMzY5NTksMCAyLjcxMzM0LC0wLjQxMzQ2IDMuODc2MjEsLTEuMjQwMzhjMi4wNDE0NiwtMS40OTg3OSAzLjA0OTI4LC00LjAwNTQgMi42MzU4MSwtNi40ODYxN2wtOC4yOTUwNywtNDguMzQ5MTZsMzUuMTQ0MjMsLTM0LjI2NTYzYzEuODA4ODksLTEuNzU3MjEgMi40MjkwOCwtNC4zNjcxOSAxLjY1Mzg1LC02Ljc3MDQzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
                    :
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB10lEQVRIic3WwYtNcRQH8M+8odhgMRZsvGIkL1loFmjqEZqFP8Ha2h/wBktLu4kVIaKmKQuhKGVBmc3MbKiJBbGQoTdMGq7FPc+9bu9xL++VU6ff7fy+3/M959f5/br8x3YhfKB2DEn40UEKPcoJPR6UyKEQeB+eRKzv9jCStzAZ3w/6LXIgEn/AJmyQdTXeT6F7kXQyFzsdsbtlEgx1idWwDaPYiT04iSXU8TFwG/FS2uFFzOE5XuAVvhcTr8dZTGMeK7LJynurS1GtHtiVyDWNM1g3hAncKSR4E9V1fAH38a2AG5bep0Z03/GtBdwErMVMrpJml8qrWlN2MjOh8bOya7GxhP3/ILJPNpG38iJ5sSsBaPu7y3hQOiwJbnYTyYtdDuAyDlcQGcen4N7Amj8RimI7SoiMBjYJ7nDZ6mpYDGKZ4WgGdjG4pa2Gz0HeXAI/EtgvKnRDelwJ3lbgvAvO9m6bvdrcHetCIT6G2+Fjhb35WBtVhDrguVh3Scf1CY6HP5W+FnvLCPUawU5Hy7iEE9Kzb+N87J3CETzDVbwucEvZrF8fya/SH5ItOcwIzkkHII+drSLUDtJqdFT/DbYemFXZq1LapnBdj/PuYY3gTFUR6rv9AAJSiX9ESl3rAAAAAElFTkSuQmCC"/>
            }
        </div>
    )
}