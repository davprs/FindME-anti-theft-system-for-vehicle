import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

// Swing Program Template for running as application or Applet
@SuppressWarnings("serial")
public class Main extends JPanel {
    /** The entry main() method */
    public static void main(String[] args) {
        // Run GUI codes in the Event-Dispatching thread for thread safety
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                JFrame frame = new JFrame();
                frame.setContentPane(new SwingTemplateApp());
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.setTitle("......");
                frame.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);  // or pack()
                frame.setVisible(true);
            }
        });
    }
}