; ModuleID = 'probe6.12965ebac08da1c4-cgu.0'
source_filename = "probe6.12965ebac08da1c4-cgu.0"
target datalayout = "e-m:o-i64:64-i128:128-n32:64-S128"
target triple = "arm64-apple-macosx11.0.0"

@alloc_bdf610a73ad9acbd2297710a4c3a4902 = private unnamed_addr constant <{ [75 x i8] }> <{ [75 x i8] c"/rustc/8c74a5d27c644a0f7a22bb2fa8dd3ff8257bc220/library/core/src/num/mod.rs" }>, align 1
@alloc_49aca167e3b86f9d96c15cab9ecf731f = private unnamed_addr constant <{ ptr, [16 x i8] }> <{ ptr @alloc_bdf610a73ad9acbd2297710a4c3a4902, [16 x i8] c"K\00\00\00\00\00\00\00~\04\00\00\05\00\00\00" }>, align 8
@str.0 = internal constant [25 x i8] c"attempt to divide by zero"

; probe6::probe
; Function Attrs: uwtable
define void @_ZN6probe65probe17h7bd8f3e994daf293E() unnamed_addr #0 {
start:
  %0 = call i1 @llvm.expect.i1(i1 false, i1 false)
  br i1 %0, label %panic.i, label %"_ZN4core3num21_$LT$impl$u20$u32$GT$10div_euclid17h09968e2712beedd4E.exit"

panic.i:                                          ; preds = %start
; call core::panicking::panic
  call void @_ZN4core9panicking5panic17h63d728166436e1a4E(ptr align 1 @str.0, i64 25, ptr align 8 @alloc_49aca167e3b86f9d96c15cab9ecf731f) #3
  unreachable

"_ZN4core3num21_$LT$impl$u20$u32$GT$10div_euclid17h09968e2712beedd4E.exit": ; preds = %start
  ret void
}

; Function Attrs: nocallback nofree nosync nounwind willreturn memory(none)
declare i1 @llvm.expect.i1(i1, i1) #1

; core::panicking::panic
; Function Attrs: cold noinline noreturn uwtable
declare void @_ZN4core9panicking5panic17h63d728166436e1a4E(ptr align 1, i64, ptr align 8) unnamed_addr #2

attributes #0 = { uwtable "frame-pointer"="non-leaf" "target-cpu"="apple-m1" }
attributes #1 = { nocallback nofree nosync nounwind willreturn memory(none) }
attributes #2 = { cold noinline noreturn uwtable "frame-pointer"="non-leaf" "target-cpu"="apple-m1" }
attributes #3 = { noreturn }

!llvm.module.flags = !{!0}

!0 = !{i32 8, !"PIC Level", i32 2}
