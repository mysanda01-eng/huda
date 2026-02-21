VIDEO - Upload Here
====================

For "For You" section:
- File format: .mp4 (recommended for browser compatibility)
- You can name it anything (e.g., video.mp4, special-video.mp4)

To embed your video:
1. Upload your video file to this folder
2. Open index.html in a text editor
3. Find the "VIDEO SECTION" comment (search for "For You")
4. Replace the video-placeholder div with an HTML5 video player:

Example code:
<video width="100%" style="border: 1px solid rgba(212, 153, 159, 0.25);" controls>
    <source src="./video/your-video-name.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

Replace "your-video-name.mp4" with your actual filename.
