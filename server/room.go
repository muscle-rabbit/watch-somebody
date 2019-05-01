package main

type room struct {
	join    chan *client
	clients map[*client]bool
}

func newRoom() *room {
	return &room{
		clients: make(map[*client]bool),
	}
}

func (r *room) run() {
	for {
		select {
		case client := <-r.join:
			r.clients[client] = true
		}
	}
}
