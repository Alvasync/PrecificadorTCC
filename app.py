from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_bcrypt import Bcrypt
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Chave secreta para sessão
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Função para precificar o imóvel (simulação)
def predict_price(bairro, area, quartos, banheiros):
    bairro_preco = {
        'Águas de Igaratá': 6000, 'Altos de Sant\'ana I': 5500, 'Altos de Sant\'ana II': 5800, 'Avareí': 6200,
        'Balneário Paraíba': 5800, 'Bandeira Branca I': 5900, 'Bandeira Branca II': 5900, 'Beira Rio': 6000,
        'Bela Vista': 6400, 'Bica do Boi': 6100, 'Campo Grande': 6500, 'Cassununga': 5800, 'Centro': 7000,
        'Chacaras Guararema': 6200, 'Chacaras Marília': 6300, 'Chacaras Reunidas do Igarapés': 6300,
        'Cidade Jardim': 6700, 'Cidade Salvador': 6600, 'Clube de Campo': 6500, 'Conjunto 1° de Maio': 5500,
        'Conjunto 22 de Abril': 5400, 'Conjunto São Benedito': 5900, 'Estância Porto Velho': 6500,
        'Fazenda Três Moleques': 5800, 'Igarapés': 6000, 'Itapoã': 6100, 'Jardim América': 6500,
        'Jardim Bela Vista': 6300, 'Jardim Boa Vista': 6500, 'Jardim Califórnia': 6300, 'Jardim Coleginho': 6000,
        'Jardim das Oliveiras': 6400, 'Jardim Emília': 6200, 'Jardim Esperança': 6100, 'Jardim Flórida': 6000,
        'Jardim Guarani': 6400, 'Jardim Independência': 6300, 'Jardim Jacinto': 6200, 'Jardim Leblon': 6600,
        'Jardim Leonidia': 6300, 'Jardim Liberdade': 6400, 'Jardim Luíza': 6500, 'Jardim Marcondes': 6300,
        'Jardim Maria Amélia I': 5900, 'Jardim Maria Amélia II': 5900, 'Jardim Marister': 6000, 'Jardim Mesquita': 6100,
        'Jardim Nicélia': 6400, 'Jardim Nossa Senhora de Lourdes': 6300, 'Jardim Nova Esperança': 6400,
        'Jardim Novo Amanhecer': 6500, 'Jardim Olímpia': 6200, 'Jardim Panorama': 6600, 'Jardim Paraíba': 6700,
        'Jardim Paraíso': 6500, 'Jardim Paulistano': 6400, 'Jardim Pereira do Amparo': 6000, 'Jardim Pitoresco': 6300,
        'Jardim Primavera': 6200, 'Jardim Real': 6600, 'Jardim Santa Maria': 6300, 'Jardim Santa Marina': 6100,
        'Jardim Santa Terezinha': 6000, 'Jardim São Gabriel': 6500, 'Jardim São José': 6300, 'Jardim São Luiz': 6400,
        'Jardim São Manoel': 6500, 'Jardim São Paulo': 6600, 'Jardim Siesta': 6200, 'Jardim Sper': 6100,
        'Jardim Vera Lúcia': 6000, 'Jardim Vista Verde': 6500, 'Jardim Yolanda': 6400, 'Lagoinha': 6300,
        'Lagoa Azul': 6200, 'Mandi': 6500, 'Mirante do Vale': 6700, 'Nova Aliança': 6600, 'Nova Jacareí': 6400,
        'Pagador Andrade': 6300, 'Parateí de Baixo': 6200, 'Parateí de Cima': 6300, 'Parateí do Meio': 6200,
        'Parque Brasil': 6600, 'Parque Califórnia': 6500, 'Parque dos Príncipes': 6400, 'Parque dos Sinos': 6500,
        'Parque Imperial': 6700, 'Parque Itamaraty': 6600, 'Parque Meia Lua': 6500, 'Parque Nova América': 6400,
        'Parque Residencial Jequitiba': 6200, 'Parque Santo Antônio': 6600, 'Parque Santa Paula': 6500,
        'Pedramar': 6400, 'Pedras Preciosas': 6300, 'Pedregulho': 6200, 'Portal Alvorada': 6400,
        'Prolongamento Santa Maria': 6500, 'Recanto dos Pássaros': 6300, 'Remédios': 6200, 'Rio Abaixo': 6500,
        'Rio Comprido': 6400, 'Santa Cruz dos Lázaros': 6300, 'Santo Antonio da Boa Vista': 6600,
        'São João': 6700, 'São Silvestre': 6400, 'Sunset Garden': 6500, 'Terras da Conceição': 6400,
        'Terras de Santa Clara': 6300, 'Terras de Santa Helena': 6200, 'Terras de Sant\'ana': 6500,
        'Terras de São João': 6600, 'Vale dos Lagos': 6700, 'Veraneio Ijal': 6400, 'Veraneio Irajá': 6500,
        'Vila Aprazível': 6200, 'Vila Denise': 6000, 'Vila D\'Itália': 6300, 'Vila Emídia Costa': 6100,
        'Vila Formosa': 6200, 'Vila Garcia': 6300, 'Vila Lopez': 6000, 'Vila Machado': 6300, 'Vila Martinez': 6200,
        'Vila Nossa Senhora de Fátima': 6100, 'Vila Pinheiro': 6400, 'Vila Romana': 6500, 'Vila Santa Mônica': 6300,
        'Vila Santa Rita': 6200, 'Vila São Judas Tadeu': 6000, 'Vila São João II': 6100, 'Vila São Simão': 6300,
        'Vila Vilma': 6200, 'Vila Zezé': 6100, 'Vilas de Sant\'ana': 6500, 'Villa Branca': 6400, 'Vista Azul': 6500
    }

    preco_bairro = bairro_preco.get(bairro, 5500)
    preco_estimado = preco_bairro * (area * 0.01 + quartos * 0.5 + banheiros * 0.3)
    return preco_estimado

# Simulação de banco de dados de usuários (em produção, use um banco de dados real)
users = {
    'admin': bcrypt.generate_password_hash('admin123').decode('utf-8')
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return jsonify({'message': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        bairro = request.form["bairro"]
        area = float(request.form["area"])
        quartos = int(request.form["quartos"])
        banheiros = int(request.form["banheiros"])
        preco = predict_price(bairro, area, quartos, banheiros)
        return render_template("index.html", preco=f"R$ {preco:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'), bairro=bairro)

    return render_template("index.html", preco=None)

@app.route('/register', methods=['POST'])
def register():
    try:
        username = request.form.get('reg-username')
        email = request.form.get('reg-email')
        password = request.form.get('reg-password')
        confirm_password = request.form.get('reg-confirm-password')

        if password != confirm_password:
            flash('As senhas não coincidem', 'error')
            return redirect(url_for('index'))

        if User.query.filter_by(username=username).first():
            flash('Nome de usuário já existe', 'error')
            return redirect(url_for('index'))

        if User.query.filter_by(email=email).first():
            flash('Email já cadastrado', 'error')
            return redirect(url_for('index'))

        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        flash('Conta criada com sucesso!', 'success')
        return redirect(url_for('index'))
    except Exception as e:
        flash('Erro ao criar conta. Tente novamente.', 'error')
        return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Usuário ou senha inválidos', 'error')
            return redirect(url_for('index'))
    except Exception as e:
        flash('Erro ao fazer login. Tente novamente.', 'error')
        return redirect(url_for('index'))

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        email = request.form.get('recovery-email')
        user = User.query.filter_by(email=email).first()
        
        if user:
            # Aqui você implementaria o envio de email
            # Por enquanto, apenas simulamos
            flash('Instruções de recuperação enviadas para seu email', 'success')
        else:
            flash('Email não encontrado', 'error')
        
        return redirect(url_for('index'))
    except Exception as e:
        flash('Erro ao processar recuperação de senha', 'error')
        return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logout realizado com sucesso!'}), 200

@app.route('/check-auth')
def check_auth():
    if 'user' in session:
        return jsonify({'authenticated': True, 'user': session['user']}), 200
    return jsonify({'authenticated': False}), 401

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)