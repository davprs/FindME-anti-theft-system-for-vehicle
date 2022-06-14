public class Timer {
    private final Object monitor;
    private Integer countDownStart;
    private Integer currentCountDownState;

    public Timer(Integer countDownStart, Object monitor){
        this.monitor = monitor;
        this.countDownStart = countDownStart;
        resetCurrentCountDownState();
    }

    public void startCounting(){
        new Thread(()-> {
            while (getCurrentCountDownState() >= 0){
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (monitor){
                    setCurrentCountDownState(getCurrentCountDownState() - 1);
                    monitor.notifyAll();
                    if (getCurrentCountDownState() == 0){
                        resetCurrentCountDownState();
                    }
                }
            }
        }).start();
    }

    synchronized public Integer getCountDownStart() {
        return countDownStart;
    }

    synchronized public Integer getCurrentCountDownState() {
        return currentCountDownState;
    }

    synchronized public void setCountDownStart(Integer countDownStart) {
        this.countDownStart = countDownStart;
        resetCurrentCountDownState();
    }

    synchronized public void setCurrentCountDownState(Integer currentCountDownState) {
        this.currentCountDownState = currentCountDownState;
    }

    synchronized private void resetCurrentCountDownState(){
        this.currentCountDownState = this.countDownStart;
    }

    @Override
    synchronized public String toString() {
        return "Timer{" +
                "countDownStart=" + countDownStart +
                ", currentCountDownState=" + currentCountDownState +
                '}';
    }
}
