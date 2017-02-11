# 2017-02-11
# 배열에서 가장 작은 수 제거

arr = [4, 3, 5, 33, 2, 10]
min = arr.inject(arr[0]) {
    |min, v|
        if min < v
            min
        else
            v
        end
}

print "before: #{arr}\n"
arr.delete(min)
puts "after: #{arr}\n"

