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
    whatsapp = db.Column(db.String(15))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Função para precificar o imóvel (simulação)
def predict_price(bairro, area_construida, area_terreno, quartos, banheiros, tipo_imovel):
    # Valores médios realistas de Jacareí (junho/2025)
    valor_m2 = {
        'Casa': 3000,
        'Apartamento': 3000,
        'Terreno': 700,
        'Comercial': 4000
    }
    if tipo_imovel == 'Casa':
        # Novo modelo: (área construída × 3.000) + (área do terreno × 700)
        valor_casa = area_construida * valor_m2['Casa']
        valor_terreno = area_terreno * valor_m2['Terreno']
        preco_estimado = valor_casa + valor_terreno
    elif tipo_imovel == 'Terreno':
        preco_estimado = area_terreno * valor_m2['Terreno']
    else:
        # Apartamento ou Comercial: usar área construída
        preco_m2 = valor_m2.get(tipo_imovel, 3000)
        preco_estimado = area_construida * preco_m2
    return round(preco_estimado, 2)

# Simulação de banco de dados de usuários (em produção, use um banco de dados real)
users = {
    'admin': bcrypt.generate_password_hash('admin123').decode('utf-8')
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            flash('Faça login ou crie uma conta para acessar o precificador.', 'error')
            return redirect(url_for('index', _anchor='login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route("/", methods=["GET", "POST"])
def index():
    user = session.get('user')
    if request.method == "POST":
        if not user:
            flash('Faça login ou crie uma conta para acessar o precificador.', 'error')
            return redirect(url_for('index', _anchor='login'))
        bairro = request.form["bairro"]
        area_construida = float(request.form["area_construida"])
        area_terreno = float(request.form["area_terreno"])
        quartos = int(request.form["quartos"])
        banheiros = int(request.form["banheiros"])
        tipo_imovel = request.form.get("tipo_imovel", "Casa")
        preco = predict_price(bairro, area_construida, area_terreno, quartos, banheiros, tipo_imovel)
        return render_template("index.html", preco=f"R$ {preco:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'), bairro=bairro, user=user, tipo_imovel=tipo_imovel)
    return render_template("index.html", preco=None, user=user)

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
        import traceback
        print('ERRO AO CRIAR CONTA:', traceback.format_exc())
        flash('Erro ao criar conta. Tente novamente.', 'error')
        return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['user'] = user.username  # Salva o nome do usuário na sessão
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Usuário ou senha inválidos', 'error')
            return redirect(url_for('index'))
    except Exception as e:
        import traceback
        print('ERRO AO FAZER LOGIN:', traceback.format_exc())
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
    flash('Logout realizado com sucesso!', 'success')
    return redirect(url_for('index'))

@app.route('/check-auth')
def check_auth():
    if 'user' in session:
        return jsonify({'authenticated': True, 'user': session['user']}), 200
    return jsonify({'authenticated': False}), 401

@app.route('/perfil', methods=['GET', 'POST'])
@login_required
def perfil():
    user = User.query.filter_by(username=session['user']).first()
    if request.method == 'POST':
        novo_nome = request.form.get('novo_nome')
        whatsapp = request.form.get('whatsapp')
        if novo_nome:
            user.username = novo_nome
            session['user'] = novo_nome
        if whatsapp is not None:
            user.whatsapp = whatsapp
        db.session.commit()
        flash('Perfil atualizado com sucesso!', 'success')
        return redirect(url_for('perfil'))
    return render_template('perfil.html', user=user)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)