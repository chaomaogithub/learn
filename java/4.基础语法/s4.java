class FreshJuice {
    enum FreshJuiceSize { SAMLL, MEDIUM, LARGE }
    FreshJuiceSize size;
}

public class s4 {
    public static void main (String[] args) {
        FreshJuice juice = new FreshJuice();
        juice.size = FreshJuice.FreshJuiceSize.MEDIUM;

        System.out.print(juice.size);
    }
}