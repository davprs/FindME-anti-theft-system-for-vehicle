import io.socket.client.IO;
import io.socket.client.Socket;

import java.net.URI;

public class ServerComunication {
    private static IO.Options options;
    private Socket socket;
    private URI uri;

    public ServerComunication() {
        this.uri = URI.create("ws://127.0.0.1:3000");
        this.options = IO.Options.builder().build();
        createSocket(uri, options);
    }

    private void createSocket(URI uri, IO.Options options){
        this.socket = IO.socket(uri, options);
        this.socket.connect();
    }

    public URI getUri() {
        return uri;
    }

    public void setUri(URI uri) {
        this.uri = uri;
        this.socket.close();
        createSocket(uri, options);
    }

    public void send(String msg){
        socket.emit("chat message", msg);
    }
}
