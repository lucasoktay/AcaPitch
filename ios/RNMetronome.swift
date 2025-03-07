import AVFoundation

@objc(RNMetronome)
class RNMetronome: RCTEventEmitter {
    private var audioEngine: AVAudioEngine?
    private var timer: DispatchSourceTimer?
    private var bpm: Double = 120.0
    private var player: AVAudioPlayer?
    
    override init() {
        super.init()
        setupAudio()
    }
    
    private func setupAudio() {
        // Simplified asset loading
        if let soundURL = Bundle.main.url(forResource: "tick", withExtension: "wav") {
            do {
                player = try AVAudioPlayer(contentsOf: soundURL)
                player?.prepareToPlay()
            } catch {
                print("Error loading sound: \(error)")
            }
        } else {
            print("Could not find sound file")
        }
        
        // Setup audio session
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            print("Audio session setup error: \(error)")
        }
    }
    
    private func playTick() {
        player?.currentTime = 0
        player?.play()
    }
    
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
    
    // Required override
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
