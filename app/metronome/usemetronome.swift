@objc(RNMetronome)
class RNMetronome: RCTEventEmitter {
    private var audioEngine: AVAudioEngine?
    private var timer: DispatchSourceTimer?
    private var bpm: Double = 120.0
    
    @objc
    func start(_ bpm: Double) {
        self.bpm = bpm
        let interval = 60.0 / bpm
        
        timer = DispatchSource.makeTimerSource(queue: DispatchQueue.global(qos: .userInteractive))
        timer?.schedule(deadline: .now(), repeating: interval)
        timer?.setEventHandler { [weak self] in
            self?.playTick()
            // Send event to RN for UI update
            self?.sendEvent(withName: "onTick", body: nil)
        }
        timer?.resume()
    }
    
    @objc
    func stop() {
        timer?.cancel()
        timer = nil
    }
    
    // Required for RCTEventEmitter
    override func supportedEvents() -> [String]! {
        return ["onTick"]
    }
}