import streamlit as st
from PIL import Image

# Load external CSS
def load_css():
    with open("style.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

load_css()

# Navigation bar
st.markdown("""
<div class="navbar">
    <a href="#home">Home</a>
    <a href="#about">About Us</a>
    <a href="#signin">Sign In</a>
</div>
""", unsafe_allow_html=True)

# Main container
st.markdown('<div class="main-container">', unsafe_allow_html=True)

# Application Name and Tagline
st.title("Bloom Well")
st.markdown("### When things change inside you, things change around you")

# Load and Display Image
image_path = "assets/homepage.jpg"  # Path to image
try:
    image = Image.open(image_path)
    st.image(image, caption="Bloom Well", use_column_width=True)
except Exception as e:
    st.error(f"Error loading image: {e}")

# Welcome Message
st.markdown('<div class="welcome-message">', unsafe_allow_html=True)
st.write("Welcome to **Bloom Well**! Use the navigation bar to explore.")
st.markdown('</div>', unsafe_allow_html=True)

# Close main container
st.markdown('</div>', unsafe_allow_html=True)