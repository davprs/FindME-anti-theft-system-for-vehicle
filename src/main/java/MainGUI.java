import javax.swing.*;
import java.awt.*;
import java.awt.geom.Point2D;
import java.net.URI;
import java.net.URISyntaxException;

public class MainGUI extends JPanel {

    private static final Integer MONITOR_TIMEOUT = 2500;
    private static final Integer SIGNAL_INIT_AND_MAX = 3;
    private static final Integer BATTERY_INIT_AND_MAX = 4;
    private static final Integer DEFAULT_TIMER_VALUE = 10;
    private static final Integer ALARMED_TIMER_VALUE = 3;
    private Object monitor;
    private ServerCommunication serverCommunication;
    private Timer timer;
    private GpsPointsGetter gps;

    private JLabel timerLabel;
    private JSlider simSignalQuality, gpsSignalQuality, batteryLevel;
    private JCheckBox isMoving, isBeaconNear;
    private JLabel lblGpsSignal, lblSimSignal, lblBatteryLevel;
    private JTextField secondsInput, serverAddressInput;
    private JButton btnChangeTimer, btnChangeServerAddress;
    private JPanel timerPanel, simPanel, gpsPanel, batteryPanel, checkboxPanel, serverPanel;



    /**
     * Constructor to setup the UI components
     */
    public MainGUI() {

        this.gps = new GpsPointsGetter();
        this.serverCommunication = new ServerCommunication();

        this.setLayout(new GridLayout(6, 0));

        setupUIComponents();
        groupComponentsInSubsections();
        addComponentsInFrame();

        setupButtonActionHandlers();

    }

    private void setupUIComponents(){
        this.monitor = new Object();
        this.timerLabel = new JLabel("Timer label..", SwingConstants.CENTER);
        this.secondsInput = new JTextField();
        this.secondsInput.setColumns(4);
        this.btnChangeTimer = new JButton("set timer");

        this.simSignalQuality = new JSlider(0, SIGNAL_INIT_AND_MAX, SIGNAL_INIT_AND_MAX);
        this.simSignalQuality.setMinorTickSpacing(1);
        this.simSignalQuality.setMajorTickSpacing(1);
        this.simSignalQuality.setPaintTicks(true);

        this.gpsSignalQuality = new JSlider(0, SIGNAL_INIT_AND_MAX, SIGNAL_INIT_AND_MAX);
        this.gpsSignalQuality.setMinorTickSpacing(1);
        this.gpsSignalQuality.setMajorTickSpacing(1);
        this.gpsSignalQuality.setPaintTicks(true);

        this.batteryLevel = new JSlider(0, BATTERY_INIT_AND_MAX, BATTERY_INIT_AND_MAX);
        this.batteryLevel.setMinorTickSpacing(1);
        this.batteryLevel.setMajorTickSpacing(1);
        this.batteryLevel.setPaintTicks(true);

        this.lblGpsSignal = new JLabel(SIGNAL_INIT_AND_MAX.toString());
        this.lblSimSignal = new JLabel(SIGNAL_INIT_AND_MAX.toString());
        this.lblBatteryLevel = new JLabel(BATTERY_INIT_AND_MAX.toString());

        this.isMoving = new JCheckBox("is moving?");
        this.isBeaconNear = new JCheckBox("is beacon nearby?");

        this.serverAddressInput = new JTextField(serverCommunication.getUri().toString());
        this.serverAddressInput.setColumns(15);
        this.btnChangeServerAddress = new JButton("Change address");
    }

    private void groupComponentsInSubsections(){
        timerPanel = new JPanel();
        timerPanel.add(timerLabel);
        timerPanel.add(new Label("seconds"));
        timerPanel.add(secondsInput);
        timerPanel.add(btnChangeTimer);

        simPanel = new JPanel();
        simPanel.add(new Label("SIM signal quality"));
        simPanel.add(simSignalQuality);
        simPanel.add(lblSimSignal);

        gpsPanel = new JPanel();
        gpsPanel.add(new Label("GPS signal quality"));
        gpsPanel.add(gpsSignalQuality);
        gpsPanel.add(lblGpsSignal);

        batteryPanel = new JPanel();
        batteryPanel.add(new Label("Battery level"));
        batteryPanel.add(batteryLevel);
        batteryPanel.add(lblBatteryLevel);

        checkboxPanel = new JPanel();
        checkboxPanel.add(isMoving);
        checkboxPanel.add(isBeaconNear);

        serverPanel = new JPanel();
        serverPanel.add(new Label("Server address and port:"));
        serverPanel.add(serverAddressInput);
        serverPanel.add(btnChangeServerAddress);
    }

    private void addComponentsInFrame(){
        this.add(timerPanel);
        this.add(simPanel);
        this.add(gpsPanel);
        this.add(simPanel);
        this.add(batteryPanel);
        this.add(checkboxPanel);
        this.add(serverPanel);
    }

    private void setupButtonActionHandlers(){
        this.btnChangeTimer.addActionListener(e -> {
            Integer newTimerStart = Integer.parseInt(this.secondsInput.getText());
            this.timer.setCountDownStart(newTimerStart);
        });
        this.gpsSignalQuality.addChangeListener(e -> {
            lblGpsSignal.setText(((Integer)gpsSignalQuality.getValue()).toString());
        });
        this.simSignalQuality.addChangeListener(e -> {
            lblSimSignal.setText(((Integer)simSignalQuality.getValue()).toString());
        });
        this.batteryLevel.addChangeListener(e -> {
            lblBatteryLevel.setText(((Integer)batteryLevel.getValue()).toString());
        });
        this.btnChangeServerAddress.addChangeListener(e->{
            try {
                URI uri = new URI(serverAddressInput.getText());
                serverCommunication.setUri(uri);
            } catch (URISyntaxException ex) {
                ex.printStackTrace();
            }

        });
    }

    public void startTimer(){

        timer = new Timer(DEFAULT_TIMER_VALUE, monitor);
        timer.startCounting();
        new Thread(()->{
            Integer currentTime;
            Boolean alarmed = false;
            while (timer.getCurrentCountDownState() >= 0){
                try {
                    synchronized (monitor){
                        monitor.wait(MONITOR_TIMEOUT);

                        currentTime = timer.getCurrentCountDownState();
                        timerLabel.setText(currentTime.toString() + "/" + timer.getCountDownStart());

                        if(currentTime == 1){
                            if (deviceIsMoving() && !beaconIsNearby ()){
                                System.out.println("THEFT ALARM!");
                                if (! alarmed){
                                    alarmed = true;
                                    timer.setCountDownStart(ALARMED_TIMER_VALUE);
                                }
                            } else {
                                if (alarmed){
                                    alarmed = false;
                                    timer.setCountDownStart(DEFAULT_TIMER_VALUE);
                                }
                            }
                            sendInfoToServer(alarmed);
                        }
                    }
                } catch (InterruptedException e) {
                    System.out.println("Timer didn't notify within timeout: " + MONITOR_TIMEOUT + " ms");
                    e.printStackTrace();
                }

            }
        }).start();
    }

    private boolean deviceIsMoving(){
        return isMoving.isSelected();
    }

    private boolean beaconIsNearby(){
        return isBeaconNear.isSelected();
    }

    private void sendInfoToServer(Boolean alarmed){
        Point2D.Double point;
        if (alarmed){
            point = gps.getMovingPoint();
        } else {
            point = gps.getStaticPoint();
        }
        String info = "theft: " + alarmed + " gps:[" + point.x + "," + point.y + "]" +
                " sim: " + this.simSignalQuality.getValue() +
                " gps: " + this.gpsSignalQuality.getValue() +
                " bat: " + this.batteryLevel.getValue();
        System.out.println(info);

        serverCommunication.send(info);
    }
}