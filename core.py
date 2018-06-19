import sys
from PyQt5.QtCore import QPoint
from PyQt5.QtGui import QIcon, QFont
from PyQt5.QtWidgets import QApplication, QWidget, QToolTip, QPushButton

WINDOW_HEIGHT = 600
WINDOW_WIDTH = 971


class HomeScreen(QWidget):
    def __init__(self, app):
        super().__init__()
        self.anchor = get_window_anchor(app)
        self.initialise_UI()

    def initialise_UI(self):
        self.resize(WINDOW_WIDTH, WINDOW_HEIGHT)
        self.move(self.anchor)
        self.setWindowTitle('Partita')

        QToolTip.setFont(QFont('SansSerif', 10))
        quit_button = QPushButton('Quit', self)
        quit_button.clicked.connect(QApplication.instance().quit)
        quit_button.resize(quit_button.sizeHint())
        quit_button.move(50, 50)

        self.show()


if __name__ == '__main__':
    partita = QApplication(sys.argv)
    home_screen = HomeScreen(partita)

    sys.exit(partita.exec_())