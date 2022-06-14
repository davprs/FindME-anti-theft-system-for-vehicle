import javax.swing.*;

// Swing Program Template for running as application or Applet
@SuppressWarnings("serial")
public class Main {
    // Name-constants to define the various dimensions
    public static final int WINDOW_WIDTH = 500;
    public static final int WINDOW_HEIGHT = 500;

    /** The entry main() method */
    public static void main(String[] args) {
        // Run GUI codes in the Event-Dispatching thread for thread safety
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                JFrame frame = new JFrame();
                MainGUI mainGUI = new MainGUI();
                frame.setContentPane(mainGUI);
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.setTitle("Hardware Device Simulator");
                frame.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);  // or pack()
                frame.setVisible(true);

                mainGUI.startTimer();
            }
        });
    }
}