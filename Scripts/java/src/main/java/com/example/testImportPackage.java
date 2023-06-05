import org.example.store.Test; //File path example: https://www.youtube.com/watch?v=aY4C0QYc1_8

public class Main { //Example function with class import: https://www.programiz.com/java-programming/packages-import
    public static void main(String[] args) {
        double value = 99.5;
        String formattedValue = Test.getFormattedDollar(value);
        System.out.println("formattedValue = " + formattedValue);
    }
}
