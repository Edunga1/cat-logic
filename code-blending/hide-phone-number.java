/**
 * 2017-02-06
 * 핸드폰 뒷 자리 n개 감추기
 */

class HidePhoneNumber {
    static String hideNumber(String src, int n) {
        String result = "";
        int len = src.length();
        for (int i = 0; i < len; i++) {
            result += i < len - n ? src.charAt(i) : "*";
        }            

        return result;
    }

    public static void main(String[] args) {
        String phone = "01012345678";
        String hidden = hideNumber(phone, 4);
        System.out.println(hidden);
    }
}

