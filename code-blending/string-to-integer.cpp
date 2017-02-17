/**
 * 2017-02-17
 * 문자열을 숫자로 파싱
 */

#include <iostream>

using namespace std;

int parseInt(char* str) {
    int result = 0;
    int idx = 0;
    char curr;

    while ((curr = str[idx++]) != '\0') {
        int n;
        if (curr == '0') n = 0;
        else if (curr == '1') n = 1;
        else if (curr == '2') n = 2;
        else if (curr == '3') n = 3;
        else if (curr == '4') n = 4;
        else if (curr == '5') n = 5;
        else if (curr == '6') n = 6;
        else if (curr == '7') n = 7;
        else if (curr == '8') n = 8;
        else if (curr == '9') n = 9;
        else continue;
        result *= 10;
        result += n;
    }

    return str[0] == '-' ? 0 - result : result;
}

int main(int argc, char** argv) {
    char* arg = argv[1];
    int parsed = parseInt(arg); 
    cout << "Before: \"" << arg << "\"" << endl;
    cout << " After: " << parsed << endl;

    return 0;
}

